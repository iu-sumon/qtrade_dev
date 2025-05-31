import React, { useState, useEffect } from 'react';
import { Form, Button, Card, InputGroup, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import logo from '../../assets/broker-logo-light.png'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      
      <div className="login-header">
        <div className="status-info">
          <div className="status-item">
            <i className="far fa-calendar-alt me-2"></i>
            {formatDate(currentTime)}
          </div>
          <div className="status-item">
            <i className="far fa-clock me-2"></i>
            <span className="time-box">{formatTime(currentTime)}</span>
          </div>
        </div>
        
        <div className="market-status">
          <div className="status-item">
            <span className="status-label">DSE:</span>
            <span className="status-indicator active">● OPEN</span>
          </div>
          <div className="status-item">
            <span className="status-label">CSE:</span>
            <span className="status-indicator inactive">● Disconnected</span>
          </div>
        </div>
      </div>

      <div className="login-center">
        <Card className="login-card">
          <Card.Body>
            <div className="text-center mb-4">
              <img src={logo} width={200} height={50} alt="UFTFAST" className="login-logo" />
              <h4 className="mt-3 login-title">Welcome Back!</h4>
              <p className="login-subtitle">Sign in to your account</p>
            </div>
            
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon">
                    <i className="far fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label">Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon">
                    <i className="fas fa-lock"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                  />
                </InputGroup>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check 
                  type="checkbox" 
                  label="Remember me" 
                  className="remember-me" 
                />
                <a href="#forgot" className="forgot-password">Forgot password?</a>
              </div>

              <Button 
                variant="primary" 
                type="submit" 
                className="login-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i> 
                    Sign In
                  </>
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>

      <footer className="login-footer">
        <div className="footer-content">
          Powered by <span className="brand-highlight">q</span><span className="brand-bold">Trader</span>
          <div className="version-info">
            UFTFAST Platform v1.5.73 | Copyright © 2025 qTrader
          </div>
          <div className="developer-info">
            Developed by <span className="developer-highlight">Quant FinTech Limited</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;