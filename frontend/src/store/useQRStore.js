import { create } from "zustand";
import { qrService } from "../services/qrService";

export const useQRStore = create((set, get) => ({
  currentQR: null,
  qrHistory: [],
  isLoading: false,
  error: null,
  toast: null,

  // -------------------------------------------------------
  // Generate QR Code
  // -------------------------------------------------------
  generateQR: async (qrData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await qrService.generateQR(qrData);
      const qr = response.data?.data;

      const newQR = {
        id: qr._id,
        imageUrl: qr.qrCodeImage,
        content: qr.data,
        type: qr.type,
        size: qr.size,
        createdAt: qr.generatedAt,
      };

      set((state) => ({
        currentQR: newQR,
        qrHistory: [newQR, ...state.qrHistory],
        isLoading: false,
        toast: { message: "QR code generated successfully!", type: "success" },
      }));

      setTimeout(() => set({ toast: null }), 3000);

      return newQR;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to generate QR code";

      set({
        isLoading: false,
        error: message,
        toast: { message, type: "error" },
      });

      setTimeout(() => set({ toast: null }), 5000);

      throw error;
    }
  },

  // -------------------------------------------------------
  // Get QR History (with retry for Render cold start)
  // -------------------------------------------------------
  getQRHistory: async (retry = false) => {
    set({ isLoading: true, error: null });

    try {
      const response = await qrService.getQRCodes();
      const list = response.data?.data?.qrCodes || [];

      const history = list.map((qr) => ({
        id: qr._id,
        imageUrl: qr.qrCodeImage,
        content: qr.data,
        type: qr.type,
        size: qr.size,
        createdAt: qr.generatedAt,
      }));

      set({
        qrHistory: history,
        isLoading: false,
      });
    } catch (error) {
      // On Render cold-start, retry automatically once after 2 seconds
      if (!retry) {
        set({ isLoading: true });
        setTimeout(() => {
          get().getQRHistory(true);
        }, 2000);
        return;
      }

      const message =
        error.response?.data?.message || "Failed to fetch QR history";

      set({
        isLoading: false,
        qrHistory: [],
        error: message,
        toast: { message, type: "error" },
      });

      setTimeout(() => set({ toast: null }), 5000);
    }
  },

  // -------------------------------------------------------
  // Get a Single QR Code
  // -------------------------------------------------------
  getQRCode: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await qrService.getQRCode(id);
      const qr = response.data?.data;

      const formatted = {
        id: qr._id,
        imageUrl: qr.qrCodeImage,
        content: qr.data,
        type: qr.type,
        size: qr.size,
        createdAt: qr.generatedAt,
      };

      set({
        currentQR: formatted,
        isLoading: false,
      });
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch QR code";

      set({
        isLoading: false,
        error: message,
        toast: { message, type: "error" },
      });

      setTimeout(() => set({ toast: null }), 5000);
      throw error;
    }
  },

  // -------------------------------------------------------
  // Delete QR Code
  // -------------------------------------------------------
  deleteQRCode: async (id) => {
    try {
      const response = await qrService.deleteQRCode(id);

      if (!response.data?.success) {
        throw new Error("Failed to delete QR code");
      }

      set((state) => ({
        qrHistory: state.qrHistory.filter((qr) => qr.id !== id),
        toast: { message: "QR Code deleted successfully", type: "success" },
      }));

      setTimeout(() => set({ toast: null }), 3000);

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete QR code";

      set({
        toast: { message, type: "error" },
      });

      setTimeout(() => set({ toast: null }), 5000);

      throw error;
    }
  },

  // -------------------------------------------------------
  // Utilities
  // -------------------------------------------------------
  clearError: () => set({ error: null }),
  clearCurrentQR: () => set({ currentQR: null }),
  clearToast: () => set({ toast: null }),
}));
