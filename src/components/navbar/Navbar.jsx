import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  // Estado para controlar se o menu mobile está aberto
  const [isOpen, setIsOpen] = useState(false);

  // Função para fechar o menu ao clicar em um link (melhora a experiência no mobile)
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      {/* Logo à esquerda */}
      <div className="nav-logo">
        <Link to="/">
          <img className="logo" src="images/icon.png" alt="Logo" />
        </Link>
      </div>

      {/* Ícone do Menu Hambúrguer (Aparece apenas no Mobile) */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <span className={`bar ${isOpen ? "active-bar1" : ""}`}></span>
        <span className={`bar ${isOpen ? "active-bar2" : ""}`}></span>
        <span className={`bar ${isOpen ? "active-bar3" : ""}`}></span>
      </div>

      {/* Container dos Links e Botões - Recebe a classe 'active' se o menu estiver aberto */}
      <div className={`nav-menu ${isOpen ? "active" : ""}`}>
        <ul className="nav-items">
          <li><Link to="/" onClick={closeMenu}>Início</Link></li>
          <li><Link to="/comunidade" onClick={closeMenu}>Comunidade</Link></li>
          <li><Link to="/contato" onClick={closeMenu}>Contato</Link></li>
          <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
          <li><Link to="/eventos" onClick={closeMenu}>Eventos</Link></li>
          <li><Link to="/suporte" onClick={closeMenu}>Suporte</Link></li>
        </ul>

        <div className="nav-auth">
          <Link to="/login" className="btn-login" onClick={closeMenu}>Entrar</Link>
          <Link to="/signup" className="btn-signup" onClick={closeMenu}>Criar Conta</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;