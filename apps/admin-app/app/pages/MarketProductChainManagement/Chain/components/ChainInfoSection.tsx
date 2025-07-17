/* eslint-disable */
import React, { useState, MouseEvent } from 'react';
import { Card, Typography, Row, Col, Space } from 'antd';
import { CloudServerOutlined, LinkOutlined, DashboardOutlined, RocketOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { TRANSLATION_NAMESPACE } from '@app/pages/MarketProductChainManagement/constants';

const { Title, Paragraph, Text } = Typography;

const useStyles = createUseStyles({
    infoSection: {
        marginBottom: '24px',
        overflow: 'hidden',
        position: 'relative',
    },
    glassCard: {
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        padding: '24px',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        position: 'relative',
        '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(0,50,100,0.03) 0%, rgba(50,150,255,0.05) 100%)',
            zIndex: -1,
        },
    },
    infoTitle: {
        fontSize: '28px',
        fontWeight: 600,
        marginBottom: '16px',
        backgroundImage: 'linear-gradient(90deg, #2D3A8C 0%, #5A67D8 100%)',
        backgroundClip: 'text',
        color: 'transparent',
        display: 'inline-block',
    },
    infoDescription: {
        fontSize: '16px',
        lineHeight: '26px',
        color: 'rgba(0, 0, 0, 0.65)',
        marginBottom: '24px',
    },
    featureRow: { marginTop: '24px' },
    featureCard: {
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(5px)',
        borderRadius: '12px',
        padding: '16px',
        height: '100%',
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
        transform: 'perspective(1000px) rotateX(0) rotateY(0)',
        '&:before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0) 20%, rgba(90,103,216,0.05) 70%)',
            opacity: 0,
            transform: 'scale(0.8) rotate(0deg)',
            transformOrigin: 'center center',
            transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease',
            zIndex: -1,
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
            zIndex: -1,
        },
        '&:hover': {
            transform: 'perspective(1000px) translateY(-5px) rotateX(2deg) rotateY(5deg)',
            boxShadow: '0 15px 30px rgba(0, 0, 30, 0.15)',
            background: 'rgba(255, 255, 255, 0.7)',
            '&:before': {
                opacity: 1,
                transform: 'scale(1) rotate(180deg)',
            },
            '&:after': { opacity: 1 },
            '& $iconWrapper': {
                transform: 'scale(1.15)',
                boxShadow: '0 0 20px rgba(90, 103, 216, 0.3)',
                background: 'rgba(90, 103, 216, 0.15)',
            },
            '& $featureTitle': { backgroundPosition: 'right center' },
            '& $particle': { animation: '$float 3s infinite ease-in-out' },
            '& $shimmerEffect': { transform: 'translateX(100%)' },
        },
    },
    iconWrapper: {
        fontSize: '24px',
        color: '#5A67D8',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        borderRadius: '24px',
        background: 'rgba(90, 103, 216, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
    },
    featureTitle: {
        fontSize: '18px',
        fontWeight: 500,
        marginBottom: '8px',
        color: '#2D3A8C',
        backgroundSize: '200% auto',
        backgroundImage: 'linear-gradient(to right, #2D3A8C 0%, #5A67D8 50%, #2D3A8C 100%)',
        backgroundClip: 'text',
        transition: 'background-position 0.5s ease',
        backgroundPosition: 'left center',
    },
    featureDescription: {
        fontSize: '14px',
        color: 'rgba(0, 0, 0, 0.65)',
        lineHeight: '22px',
    },
    gradientBg: {
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(90,103,216,0.1) 0%, rgba(255,255,255,0) 70%)',
        zIndex: -1,
        opacity: 0.7,
    },
    gradientBg1: {
        top: '-250px',
        right: '-100px',
    },
    gradientBg2: {
        bottom: '-300px',
        left: '-150px',
    },
    particle: {
        position: 'absolute',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        opacity: 0,
        zIndex: -1,
        transition: 'opacity 0.3s ease',
        boxShadow: '0 0 10px rgba(90, 103, 216, 0.5)',
    },
    shimmerEffect: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
        transform: 'translateX(-100%)',
        transition: 'transform 1s ease-in-out',
        zIndex: 0,
    },
    '@keyframes float': {
        '0%': {
            transform: 'translateY(0) rotate(0deg)',
            opacity: 0,
        },
        '50%': { opacity: 0.7 },
        '100%': {
            transform: 'translateY(-100px) rotate(360deg)',
            opacity: 0,
        },
    },
});

// Define types for our components
interface ParticleEffectProps {
    active: boolean;
    color: string;
    count?: number;
}

interface MousePosition {
    rotateX: number;
    rotateY: number;
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    colorTheme: string;
}

// Generate random particles for a card
const ParticleEffect: React.FC<ParticleEffectProps> = ({ active, color, count = 5 }) => {
    const classes = useStyles();
    const particles = [];

    for (let i = 0; i < count; i++) {
        const size = Math.random() * 6 + 4;
        const left = Math.random() * 100;
        const bottom = Math.random() * 20;
        const delay = Math.random() * 2;
        const duration = Math.random() * 2 + 2;

        particles.push(
            <div
                key={i}
                className={classes.particle}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    bottom: `${bottom}%`,
                    backgroundColor: color,
                    opacity: active ? 0.7 : 0,
                    animation: active ? `${classes['@keyframes float']} ${duration}s infinite ease-in-out ${delay}s` : 'none',
                }}
            />,
        );
    }

    return <>{particles}</>;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, colorTheme }) => {
    const classes = useStyles();
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState<MousePosition>({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isHovered) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate the rotation intensity (max 4 degrees)
        const rotateY = ((mouseX - centerX) / centerX) * 4;
        const rotateX = -((mouseY - centerY) / centerY) * 4;

        setMousePosition({ rotateX, rotateY });
    };

    return (
        <Card
            className={classes.featureCard}
            bordered={false}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setMousePosition({ rotateX: 0, rotateY: 0 });
            }}
            onMouseMove={handleMouseMove}
            style={{
                transform: isHovered
                    ? `perspective(1000px) translateY(-5px) rotateX(${mousePosition.rotateX}deg) rotateY(${mousePosition.rotateY}deg)`
                    : 'perspective(1000px) rotateX(0) rotateY(0)',
            }}
        >
            <div className={classes.shimmerEffect} />
            <ParticleEffect active={isHovered} color={colorTheme} count={8} />
            <Space direction="vertical" style={{ position: 'relative', zIndex: 2 }}>
                <div className={classes.iconWrapper}>
                    {icon}
                </div>
                <Text strong className={classes.featureTitle}>{title}</Text>
                <Text className={classes.featureDescription}>
                    {description}
                </Text>
            </Space>
        </Card>
    );
};

const ChainInfoSection: React.FC = () => {
    const classes = useStyles();
    const { t } = useTranslation(TRANSLATION_NAMESPACE);

    return (
        <section className={classes.infoSection}>
            <div className={`${classes.gradientBg} ${classes.gradientBg1}`} />
            <div className={`${classes.gradientBg} ${classes.gradientBg2}`} />

            <Card className={classes.glassCard}>
                <Title level={2} className={classes.infoTitle}>
                    {t('CHAIN_MANAGEMENT')}
                </Title>

                <Paragraph className={classes.infoDescription}>
                    {t(
                        'CHAIN_INFO.DESCRIPTION',
                        `Chain Management is a supply chain optimization solution that connects products, 
                        suppliers, and locations into integrated chains. It enables efficient product flow 
                        management from source to destination, with optimized inventory control and streamlined 
                        operations for maximum efficiency and minimal waste.`,
                    )}
                </Paragraph>

                <Row gutter={[24, 24]} className={classes.featureRow}>
                    <Col xs={24} sm={12} md={6}>
                        <FeatureCard
                            icon={<LinkOutlined />}
                            title={t('CHAIN_INFO.FEATURE_1.TITLE', 'End-to-End Visibility')}
                            description={t(
                                'CHAIN_INFO.FEATURE_1.DESCRIPTION',
                                `Gain complete visibility across your entire supply chain from suppliers 
                                to end customers with real-time tracking and monitoring.`,
                            )}
                            colorTheme="#5A67D8"
                        />
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <FeatureCard
                            icon={<DashboardOutlined />}
                            title={t('CHAIN_INFO.FEATURE_2.TITLE', 'Intelligent Planning')}
                            description={t(
                                'CHAIN_INFO.FEATURE_2.DESCRIPTION',
                                `Optimize inventory levels, minimize stock-outs, and reduce excess inventory 
                                with AI-powered demand forecasting.`,
                            )}
                            colorTheme="#6B46C1"
                        />
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <FeatureCard
                            icon={<CloudServerOutlined />}
                            title={t('CHAIN_INFO.FEATURE_3.TITLE', 'Centralized Control')}
                            description={t(
                                'CHAIN_INFO.FEATURE_3.DESCRIPTION',
                                `Manage all suppliers, locations, and products from a single platform 
                                with automated workflows and rule-based processing.`,
                            )}
                            colorTheme="#4C51BF"
                        />
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <FeatureCard
                            icon={<RocketOutlined />}
                            title={t('CHAIN_INFO.FEATURE_4.TITLE', 'Operational Excellence')}
                            description={t(
                                'CHAIN_INFO.FEATURE_4.DESCRIPTION',
                                `Increase efficiency by 30%, reduce lead times, and optimize batch sizes 
                                for maximum operational productivity.`,
                            )}
                            colorTheme="#3182CE"
                        />
                    </Col>
                </Row>
            </Card>
        </section>
    );
};

export default ChainInfoSection;
