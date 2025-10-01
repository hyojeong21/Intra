import { useState } from "react";
import { Link } from "react-router-dom";
import { notices } from "../data/noticesData";
import Header from "../components/Header"; 

export default function NoticesExtendedPage() { 
    const [visibleCount, setVisibleCount] = useState(10);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 10);
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
                    공지사항
                </h1>
            </div>
            <div
                style={{
                    backgroundColor: '#f0f0f0',
                    padding: '30px',
                    borderRadius: '16px',
                    maxWidth: '800px',
                    margin: '0 auto 40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        padding: '30px',
                        borderRadius: '16px',
                        width: '90%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'left'
                    }}
                >
                    <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
                        {notices.slice(0, visibleCount).map((notice, index) => (
                            <li
                                key={index}
                                style={{
                                    padding: '15px',
                                    borderBottom: index === visibleCount - 1 ? 'none' : '1px solid #ddd',
                                    fontSize: '18px'
                                }}
                            >
                                <Link
                                    to={notice.link}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#333',
                                        display: 'block',
                                        width: '100%'
                                    }}
                                >
                                    {notice.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {visibleCount < notices.length && (
                        <button
                            onClick={handleLoadMore}
                            style={{
                                marginTop: '20px',
                                padding: '10px 0',
                                width: '100%',
                                maxWidth: '100%',
                                fontSize: '16px',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: '#555',
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            더보기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
