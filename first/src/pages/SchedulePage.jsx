import { useState } from "react";
import { schedules } from "../data/matchSchedules";
import Header from "../components/Header";

export default function LandingPage() {
    const [selectedSport, setSelectedSport] = useState('농구');
    const [currentDate, setCurrentDate] = useState(new Date());

    const sports = ['농구', '풋살', '야구', '테니스', '피구'];

    const handleSportClick = (sport) => {
        setSelectedSport(sport);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const rows = [];
        let cells = [];

        for (let i = 0; i < firstDay; i++) {
            cells.push(<td key={`empty-${i}`} style={{ width: '100px', height: '100px' }}></td>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const event = selectedSport && schedules[selectedSport]?.find(e => e.date === dateStr);

            cells.push(
                <td
                    key={day}
                    style={{
                        width: '100px',
                        height: '100px',
                        textAlign: 'center',
                        verticalAlign: 'top',
                        fontSize: '18px',
                        backgroundColor: event ? '#ffe6e6' : '#f9f9f9',
                        border: '1px solid #ddd',
                        position: 'relative',
                        paddingTop: '5px'
                    }}
                >
                    {day}
                    {event && (
                        <>
                            <div style={{ fontSize: '12px', color: 'red' }}>● 경기</div>
                            <div style={{ fontSize: '12px', color: '#555' }}>{event.time}</div>
                        </>
                    )}
                </td>
            );

            if (cells.length % 7 === 0 || day === daysInMonth) {
                rows.push(<tr key={day}>{cells}</tr>);
                cells = [];
            }
        }

        return (
            <table style={{ borderCollapse: 'collapse', margin: '0 auto', fontSize: '18px' }}>
                <thead>
                    <tr>
                        {['일', '월', '화', '수', '목', '금', '토'].map((dayName) => (
                            <th
                                key={dayName}
                                style={{
                                    padding: '12px',
                                    backgroundColor: '#76b8ff',
                                    color: 'white',
                                    border: '1px solid #ddd'
                                }}
                            >
                                {dayName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    };

    return (
        <div>
            <Header />
            <div style={{ padding: '80px 0 5px 0', textAlign: 'center' }}>
                <h1 style={{
                    textAlign: "center",
                    margin: "100px 0 20px 0",
                    fontSize: "36px",
                    fontWeight: "bold"
                }}>
                    경기 일정
                </h1>
            </div>

            {/* --- 종목 버튼 --- */}
            <div className="category-bar" style={{ marginTop: '20px', justifyContent: 'center' }}>
                {sports.map((sport) => (
                    <button
                        key={sport}
                        onClick={() => handleSportClick(sport)}
                        className={`category-button ${selectedSport === sport ? "active" : ""}`}
                    >
                        {sport}
                    </button>
                ))}
            </div>

            {selectedSport && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '40px', marginTop: '40px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <button
                                onClick={handlePrevMonth}
                                style={{
                                    marginRight: '20px',
                                    fontSize: '16px',
                                    padding: '8px 16px',
                                    backgroundColor: '#333',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#555')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#333')}
                            >
                                ◀ 이전 달
                            </button>

                            <span style={{ fontSize: '22px', fontWeight: 'bold' }}>
                                {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                            </span>

                            <button
                                onClick={handleNextMonth}
                                style={{
                                    marginLeft: '20px',
                                    fontSize: '16px',
                                    padding: '8px 16px',
                                    backgroundColor: '#333',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#555')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#333')}
                            >
                                다음 달 ▶
                            </button>
                        </div>
                        {renderCalendar()}
                    </div>

                    <div style={{
                        width: '300px',
                        maxHeight: '500px',
                        padding: '20px',
                        backgroundColor: '#f1f5ff',
                        borderRadius: '12px',
                        fontSize: '16px',
                        overflowY: 'auto'
                    }}>
                        <h3 style={{ marginBottom: '5px' }}>다가오는 경기</h3>
                        <p style={{ marginBottom: '25px', color: '#555' }}>예정된 경기들</p>

                        {schedules[selectedSport]
                            .filter(e => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return new Date(e.date) >= today;
                            })
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .map((event, idx) => (
                                <div key={idx} style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    marginBottom: '10px'
                                }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                        {event.match}
                                        <span style={{
                                            fontSize: '12px',
                                            color: '#007bff',
                                            border: '1px solid #007bff',
                                            borderRadius: '4px',
                                            padding: '4px',
                                            marginLeft: '10px'
                                        }}>
                                            {event.status}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#555', marginBottom: '3px' }}>{event.date}</div>
                                    <div style={{ fontSize: '14px', color: '#555', marginBottom: '3px' }}>{event.time}</div>
                                    <div style={{ fontSize: '14px', color: '#555', marginBottom: '8px' }}>{event.location}</div>
                                </div>
                            ))
                        }

                        {schedules[selectedSport].filter(e => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); 
                            return new Date(e.date) >= today;
                        }).length === 0 && (
                            <p>예정된 경기가 없습니다.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
