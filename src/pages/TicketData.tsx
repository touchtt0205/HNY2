import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, RefreshCcw } from 'lucide-react';
import './TicketBookingApp.css'; // นำเข้า CSS
import massage from "../image/massage.png";
import moota from "../image/moograta.png";
import gm from "../image/goodmood.png";
import menu from "../image/menu.png";
import h from "../image/heart.png";

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
  { id: 1, used: false, type: 'ทานอาหาร', event: 'พาไปกินหมูทะ', date: 'ไม่ระบุ', time: 'ไม่ระบุ', location: 'ร้านหมูทะ', price: 500 },
  { id: 2, used: false, type: 'บริการ', event: 'นวดหลัง 1 วัน', date: 'ไม่ระบุ', time: 'ไม่ระบุ', location: 'ร้านนวดสุขภาพ', price: 1000 },
  { id: 3, used: false, type: 'บริการ', event: 'นวดหลัง 3 วัน', date: 'ไม่ระบุ', time: 'ไม่ระบุ', location: 'ร้านนวดสุขภาพ', price: 3000 },
  { id: 4, used: false, type: 'ตามใจ', event: 'ตามใจ 1 วัน', date: 'ไม่ระบุ', time: 'ไม่ระบุ', location: 'สถานที่ตามใจ', price: 2000 },
  { id: 5, used: false, type: 'ไม่มีการงอน', event: 'ไม่มีการงอน 1 วัน', date: 'ไม่ระบุ', time: 'ไม่ระบุ', location: 'สถานที่ความสุข', price: 1500 },
  { id: 6, used: false, type: 'คิด', event: 'คิดว่ากินอะไร 1 วัน', date: 'ไม่ระบุ', time: 'ไม่ระบุ', location: 'ร้านอาหารหลากหลาย', price: 1200 },
];

const TicketBookingApp: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>(() => {
    const savedTickets = localStorage.getItem('tickets');
    return savedTickets ? JSON.parse(savedTickets) : initialTickets;
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showSecretButton, setShowSecretButton] = useState(false); // ใช้ state เพื่อแสดงปุ่มลับ
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleTicketUse = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setShowModal(true);
  };

  const handleConfirmUse = () => {
    if (selectedTicketId !== null) {
      const currentDate = new Date();

      const formattedDate = `${currentDate.getDate()} ${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear() + 543}`;
      const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

      setTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket.id === selectedTicketId
            ? { ...ticket, used: true, date: formattedDate, time: formattedTime }
            : ticket
        )
      );
      setShowModal(false);
    }
  };

  const handleCancelUse = () => {
    setShowModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleResetTickets = () => {
    setTickets(initialTickets);
    localStorage.removeItem('tickets');
  };

  const renderTicketIcon = (type: string) => {
    switch (type) {
      case 'ทานอาหาร':
        return <span className="food-icon"><img src={moota} alt="food-icon" /></span>;
      case 'บริการ':
        return <span className="service-icon"><img src={massage} alt="service icon" /></span>;
      case 'ไม่มีการงอน':
        return <span className="freestyle-icon"><img src={gm} alt="freestyle icon" /></span>;
      case 'คิด':
        return <span className="think-icon"><img src={menu} alt="think icon" /></span>;
      case 'ตามใจ':
        return <span className="special-icon"><img src={h} alt="special icon" /></span>;
      default:
        return <span className="default-icon">🎫</span>;
    }
  };

  const getMonthName = (monthIndex: number) => {
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    return months[monthIndex];
  };

  const handleSecretClick = () => {
    setShowSecretButton(prevState => !prevState);
  };

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h1 className='tick-title'>
          Your Tick<span className="secret-trigger" onClick={handleSecretClick}>e</span>ts
        </h1>
      </div>

      <div className="ticket-grid">
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            className={`ticket ${ticket.used ? 'used' : ''}`}
            onClick={() => !ticket.used && handleTicketUse(ticket.id)}
          >
            <div className={`ticket-icon ${ticket.type}`}>
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
                <span>{ticket.time}</span>
              </div>
              <div className="info">
                <span>no expiration date</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                {ticket.used && <span className="used-badge">ใช้แล้ว</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ticket-footer">คงเหลือ {tickets.filter(ticket => !ticket.used).length} ตั๋ว</div>
      <div className="container-tick">
      <button className="back-button-tick" onClick={handleBack}>
        <svg viewBox="0 0 2050 2050" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="24" height="24">
          <path d="M1582.2,1488.7a44.9,44.9,0,0,1-36.4-18.5l-75.7-103.9A431.7,431.7,0,0,0,1121.4,1189h-60.1v64c0,59.8-33.5,112.9-87.5,138.6a152.1,152.1,0,0,1-162.7-19.4l-331.5-269a153.5,153.5,0,0,1,0-238.4l331.5-269a152.1,152.1,0,0,1,162.7-19.4c54,25.7,87.5,78.8,87.5,138.6v98.3l161,19.6a460.9,460.9,0,0,1,404.9,457.4v153.4a45,45,0,0,1-45,45Z"></path>
        </svg>
      </button>
      </div>

      {showSecretButton && (
        <div className="container-tick">
          <button className="back-button-restart" onClick={handleResetTickets}>
            <RefreshCcw />
          </button>
        </div>
      )}

      {showModal && (
        <div className="ticket-modal-overlay">
          <div className="ticket-modal">
            <h3>ยืนยันการใช้ตั๋ว</h3>
            <p>ที่รักแน่ใจว่าจะใช้ละนะ!</p>
            <div className="ticket-buttons">
              <button className="ticket-confirm" onClick={handleConfirmUse}>ยืนยัน</button>
              <button className="ticket-cancel" onClick={handleCancelUse}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketBookingApp;
