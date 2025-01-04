import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  AiOutlineCalendar,
  AiOutlineDollar
} from 'react-icons/ai';
import {
  OrdersContainer,
  Header,
  OrdersList,
  OrderCard,
  OrderHeader,
  OrderStatus,
  OrderItems,
  OrderItem,
  ItemImage,
  ItemInfo,
  OrderFooter,
  EmptyState,
  LoadingState
} from './styles';

const orderStatuses = {
  pending: {
    label: 'Pendente',
    color: '#f0ad4e'
  },
  confirmed: {
    label: 'Confirmado',
    color: '#5cb85c'
  },
  cancelled: {
    label: 'Cancelado',
    color: '#d9534f'
  },
  delivered: {
    label: 'Entregue',
    color: '#5bc0de'
  }
};

export const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef,
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setOrders(ordersData);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return <LoadingState>Carregando pedidos...</LoadingState>;
  }

  return (
    <OrdersContainer>
      <Header>
        <h1>Meus Pedidos</h1>
      </Header>

      {orders.length > 0 ? (
        <OrdersList>
          {orders.map(order => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <div className="order-info">
                  <span className="order-number">Pedido #{order.id.slice(-6)}</span>
                  <div className="order-details">
                    <span>
                      <AiOutlineCalendar />
                      {formatDate(order.createdAt)}
                    </span>
                    <span>
                      <AiOutlineDollar />
                      {order.total.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </span>
                  </div>
                </div>
                <OrderStatus color={orderStatuses[order.status].color}>
                  {orderStatuses[order.status].label}
                </OrderStatus>
              </OrderHeader>

              <OrderItems>
                {order.items.map((item, index) => (
                  <OrderItem key={`${order.id}-${index}`}>
                    <ItemImage>
                      <img src={item.imageUrl} alt={item.name} />
                    </ItemImage>
                    <ItemInfo>
                      <h4>{item.name}</h4>
                      <p>Quantidade: {item.quantity}</p>
                      <p className="price">
                        {(item.price * item.quantity).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </p>
                    </ItemInfo>
                  </OrderItem>
                ))}
              </OrderItems>

              <OrderFooter>
                <div className="payment-info">
                  <p>
                    Pagamento: Cartão de crédito
                    {order.paymentDetails?.installments > 1 && 
                      ` em ${order.paymentDetails.installments}x`}
                  </p>
                  {order.paymentDetails?.lastFourDigits && (
                    <p>Final do cartão: {order.paymentDetails.lastFourDigits}</p>
                  )}
                </div>
              </OrderFooter>
            </OrderCard>
          ))}
        </OrdersList>
      ) : (
        <EmptyState>
          <p>Você ainda não fez nenhum pedido</p>
        </EmptyState>
      )}
    </OrdersContainer>
  );
};