import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, RefreshCcw } from 'lucide-react';
import './TicketBookingApp.css'; // นำเข้า CSS

interface TicketData {
  id: number;
  used: boolean;
  type: string;
  event: string;
  date: string;
  time: string;
  location: string;
  price: number;
}

const initialTickets: TicketData[] = [
  { id: 1, used: false, type: 'ทานอาหาร', event: 'พาไปกินหมูทะ', date: '25 ธ.ค. 2567', time: '19:00', location: 'ร้านหมูทะ', price: 500 },
  { id: 2, used: false, type: 'บริการ', event: 'นวดหลัง 1 วัน', date: '30 ธ.ค. 2567', time: '20:00', location: 'ร้านนวดสุขภาพ', price: 1000 },
  { id: 3, used: false, type: 'บริการ', event: 'นวดหลัง 3 วัน', date: '15 ม.ค. 2568', time: '18:30', location: 'ร้านนวดสุขภาพ', price: 3000 },
  { id: 4, used: false, type: 'ตามใจ', event: 'ตามใจ 1 วัน', date: '10 ก.พ. 2568', time: '19:30', location: 'สถานที่ตามใจ', price: 2000 },
  { id: 5, used: false, type: 'ไม่มีการงอน', event: 'ไม่มีการงอน 1 วัน', date: '5 มี.ค. 2568', time: '20:00', location: 'สถานที่ความสุข', price: 1500 },
  { id: 6, used: false, type: 'คิด', event: 'คิดว่ากินอะไร 1 วัน', date: '20 มี.ค. 2568', time: '17:00', location: 'ร้านอาหารหลากหลาย', price: 1200 },
];

const TicketBookingApp: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>(() => {
    const savedTickets = localStorage.getItem('tickets');
    return savedTickets ? JSON.parse(savedTickets) : initialTickets;
  });

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleTicketUse = (ticketId: number) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket => (ticket.id === ticketId ? { ...ticket, used: true } : ticket))
    );
  };

  const handleResetTickets = () => {
    setTickets(initialTickets);
    localStorage.removeItem('tickets');
  };

  const renderTicketIcon = (type: string) => {
    switch (type) {
      case 'ทานอาหาร':
        return '🍽️';
      case 'บริการ':
        return '💆';
      case 'ตามใจ':
        return '🫣';
      case 'คิด':
        return '🤔';
      default:
        return '🎫';
    }
  };

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h1>ตั๋วของคุณ</h1>
        <button onClick={handleResetTickets}>
          <RefreshCcw />
          รีเซ็ต
        </button>
      </div>

      <div className="ticket-grid">
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            className={`ticket ${ticket.used ? 'used' : ''}`}
            onClick={() => !ticket.used && handleTicketUse(ticket.id)}
          >
            <div className="ticket-icon">
              <span>{renderTicketIcon(ticket.type)}</span>
            </div>

            <div className="ticket-details">
              <h2>{ticket.event}</h2>
              <div className="info">
                <Calendar />
                <span>{ticket.date}</span>
              </div>
              <div className="info">
                <Clock />
                <span>{ticket.time} น.</span>
              </div>
              <div className="info">
                <MapPin />
                <span>{ticket.location}</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="price">{ticket.price} ฿</span>
                {ticket.used && <span className="used-badge">ใช้แล้ว</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ticket-footer">คงเหลือ {tickets.filter(ticket => !ticket.used).length} ตั๋ว</div>
    </div>
  );
};

export default TicketBookingApp;
