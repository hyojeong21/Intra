import { useState } from "react";
import { cheerData } from "../data/cheerData";
import Header from "../components/Header"

export default function MainPage() {
    const [selectedSport, setSelectedSport] = useState('농구');
    const [cheerMessage, setCheerMessage] = useState("");
    const [showAllCheer, setShowAllCheer] = useState(false);

    const sports = ['농구', '풋살', '야구', '테니스', '피구'];

    const currentCheerData = selectedSport ? cheerData[selectedSport] || [] : [];

    const handleSportClick = (sport) => {
        setSelectedSport(sport);
        setShowAllCheer(false);
    };

    const handleSend = () => {
        if (!cheerMessage.trim()) {
            alert("응원 메시지를 입력하세요!");
            return;
        }
        alert(`전송: ${cheerMessage}`);
        setCheerMessage("");
    };

    const isGuest = true; // 로그인 시 false 처리

    return (
        <div>
            <Header />
            {/* 제목 */}
            <div style={{ padding: '80px 0 20px 0', textAlign: 'center' }}>
                <h1 style={{
                    textAlign: "center",
                    margin: "100px 0 20px 0",
                    fontSize: "36px",
                    fontWeight: "bold"
                }}>
                    응원톡
                </h1>
            </div>

            {/* 종목별 설명 */}
            <div style={{
                backgroundColor: '#f0f0f0',
                padding: '50px 20px',
                borderRadius: '15px',
                width: '90%',
                maxWidth: '1000px',
                margin: '0 auto 50px auto',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>종목별 응원 채팅</h2>
                <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
                    우리 팀을 응원하고 다른 팀과 소통해보세요!
                </p>

                {/* 종목 선택 */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
                    {sports.map((sport) => (
                        <button
                            key={sport}
                            onClick={() => handleSportClick(sport)}
                            style={{
                                padding: '10px 15px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                border: selectedSport === sport ? '2px solid #007bff' : '1px solid #ccc',
                                borderRadius: '8px',
                                backgroundColor: selectedSport === sport ? '#e6f0ff' : '#fff'
                            }}
                        >
                            {sport}
                        </button>
                    ))}
                </div>

                {/* 게스트 안내 */}
                <div style={{
                    backgroundColor: '#e4f4ffff',
                    border: '1px solid #00ccffff',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    width: '90%',
                    maxWidth: '700px',
                    margin: '0 auto 30px auto',
                    color: '#333',
                    fontSize: '15px'
                }}>
                    현재 게스트 모드로 채팅을 보고 있습니다. 채팅에 참여하려면 로그인해주세요.
                </div>

                {/* 응원톡 영역 */}
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '20px',
                    width: '95%',
                    maxWidth: '800px',
                    margin: '0 auto 20px auto',
                    textAlign: 'left',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    border: '1px solid #eee'
                }}>
                    {/* 종목 미선택 시 안내 */}
                    {!selectedSport && (
                        <div style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
                            종목을 선택하면 응원톡이 표시됩니다.
                        </div>
                    )}

                    {/* 종목 선택 시 표시 */}
                    {selectedSport && (
                        <>
                            {!showAllCheer && currentCheerData.length > 3 && (
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    <button
                                        onClick={() => setShowAllCheer(true)}
                                        style={{
                                            padding: '8px 360px',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            backgroundColor: 'transparent',
                                            color: '#007bff',
                                            textDecoration: 'underline'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.textDecoration = 'none'}
                                        onMouseOut={e => e.currentTarget.style.textDecoration = 'underline'}
                                    >
                                        더보기
                                    </button>
                                </div>
                            )}

                            {(showAllCheer ? currentCheerData : currentCheerData.slice(-3))
                                .slice()
                                .map((item, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            padding: '15px',
                                            borderBottom: '1px solid #eee'
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '5px'
                                        }}>
                                            <div style={{ fontWeight: 'bold', color: '#555' }}>
                                                {item.author}
                                                <span style={{ color: '#999', fontSize: '13px', marginLeft: '15px' }}>
                                                    {item.time}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => alert("신고되었습니다.")}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#999',
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                    textDecoration: 'none'
                                                }}
                                                onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                                                onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
                                            >
                                                신고하기
                                            </button>
                                        </div>
                                        <div style={{ fontSize: '16px', marginBottom: '5px' }}>
                                            {item.content}
                                        </div>
                                    </div>
                                ))}
                        </>
                    )}
                </div>

                {/* 입력창 및 전송 버튼 */}
                <div style={{
                    width: '95%',
                    maxWidth: '800px',
                    margin: '0 auto 30px auto',
                    display: 'flex',
                    gap: '10px'
                }}>
                    <input
                        type="text"
                        value={cheerMessage}
                        onChange={(e) => setCheerMessage(e.target.value)}
                        placeholder={isGuest ? "로그인 후 입력 가능" : "응원 메시지를 입력하세요."}
                        disabled={isGuest}
                        style={{
                            flex: 1,
                            padding: '12px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isGuest}
                        style={{
                            padding: '12px 16px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            backgroundColor: isGuest ? '#ccc' : '#007bff',
                            color: '#fff',
                            border: 'none',
                            cursor: isGuest ? 'not-allowed' : 'pointer'
                        }}
                    >
                        전송
                    </button>
                </div>

                {/* 채팅 규칙 */}
                <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    padding: '25px',
                    width: '95%',
                    maxWidth: '700px',
                    margin: '0 auto 10px auto',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: '2',
                    textAlign: 'left'
                }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 10px 0', textAlign: 'center' }}>
                        !! 채팅 규칙 !!
                    </h3>
                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                        <li>상대방을 존중하는 건전한 응원 문화를 만들어주세요.</li>
                        <li>욕설, 비방, 차별적 발언은 금지됩니다.</li>
                        <li>부적절한 메시지는 신고해주세요.</li>
                        <li>스포츠맨십을 지켜주세요.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
