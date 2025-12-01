import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { CheckCircle, Package, XCircle, X, Clock } from "lucide-react";

export default function PedidoNotification() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (!stored) return;
    
    const user = JSON.parse(stored);
    setUserId(user.id);

    // Inscrever-se nas mudanças de pedidos em tempo real
    const channel = supabase
      .channel("pedidos_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "pedidos",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          handlePedidoUpdate(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handlePedidoUpdate = (pedido) => {
    let message = "";
    let icon = null;
    let bgColor = "";

    switch (pedido.status) {
      case "em_preparo":
        message = "🔵 Seu pedido está sendo preparado!";
        icon = <Package className="text-blue-500" size={24} />;
        bgColor = "bg-blue-500/20";
        break;
      case "pronto":
        message = "🎉 Seu pedido está PRONTO! Retire no balcão.";
        icon = <CheckCircle className="text-green-500" size={24} />;
        bgColor = "bg-green-500/20";
        playNotificationSound();
        break;
      case "entregue":
        message = "✅ Pedido entregue com sucesso!";
        icon = <CheckCircle className="text-gray-500" size={24} />;
        bgColor = "bg-gray-500/20";
        break;
      case "cancelado":
        message = "❌ Seu pedido foi cancelado. Entre em contato conosco.";
        icon = <XCircle className="text-red-500" size={24} />;
        bgColor = "bg-red-500/20";
        break;
      default:
        return;
    }

    const newNotification = {
      id: Date.now(),
      pedidoId: pedido.id,
      message,
      icon,
      bgColor,
      timestamp: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Remover notificação após 10 segundos
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
    }, 10000);
  };

  const playNotificationSound = () => {
    try {
      // Criar um beep simples usando Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = "sine";
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log("Som não disponível");
    }
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`${notif.bgColor} backdrop-blur-lg rounded-lg p-4 border border-white/20 shadow-2xl animate-slide-in`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">{notif.icon}</div>
            <div className="flex-1">
              <p className="text-white font-bold text-base">{notif.message}</p>
              <p className="text-white/70 text-xs mt-1">
                {new Date(notif.timestamp).toLocaleTimeString("pt-BR")}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notif.id)}
              className="flex-shrink-0 text-white/70 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
