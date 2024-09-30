import React, { useState, useEffect } from 'react';

interface Order {
  id: number;
  customerName: string;
  vehicle: string;
  accepted?: boolean;  
  rejected?: boolean;  
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  
  useEffect(() => {
    const fetchOrders = async () => {
      const response: Order[] = [
        { id: 1, customerName: 'João Silva', vehicle: 'Fusca' },
        { id: 2, customerName: 'Maria Oliveira', vehicle: 'Civic' },
        { id: 3, customerName: 'Pedro Santos', vehicle: 'Corolla' },
      ];
      setOrders(response);
    };

    fetchOrders();
  }, []);

  const handleAccept = (id: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, accepted: true } : order
      )
    );
    console.log(`Pedido ${id} aceito`);
  };

  const handleReject = (id: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, rejected: true } : order
      )
    );
    console.log(`Pedido ${id} rejeitado`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pedidos de Aluguel</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {orders.map((order) => (
          <li
            key={order.id}
            style={{
              marginBottom: '15px',
              padding: '10px',
              border: '2px solid #191970',
              borderRadius: '5px',
              backgroundColor: '#fff',
            }}
          >
            <h2>{order.customerName}</h2>
            <p>Veículo: {order.vehicle}</p>
            <button
              onClick={() => handleAccept(order.id)}
              style={{
                marginRight: '10px',
                borderRadius: '20px',
                backgroundColor: order.accepted ? '#ccc' : '#28a745',
                color: '#fff',
                border: 'none',
                padding: '10px 15px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              disabled={order.accepted || order.rejected} 
            >
              Aceitar
            </button>
            <button
              onClick={() => handleReject(order.id)}
              style={{
                borderRadius: '20px',
                backgroundColor: order.rejected ? '#ccc' : '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '10px 15px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              disabled={order.accepted || order.rejected} 
            >
              Rejeitar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
