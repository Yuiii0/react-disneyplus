import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import styled from "styled-components";

const Nav = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setsearchValue] = useState("");
  const initalUser = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};
  const [userData, setUserData] = useState(initalUser);

  let navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/") {
          navigate("/main");
        }
      } else {
        navigate("/");
      }
    });
  }, [auth, navigate, pathname]);

  //scroll event처리: useEffect로 관리
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      //unmount시, eventListner 해제
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); //렌더링시 한번만 실행되도록

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  //검색창을 입력하면
  const handleChange = (e) => {
    //값을 state에 저장
    setsearchValue(e.target.value);
    ///search?q=검색어로 이동
    navigate(`/search?q=${e.target.value}`);
  };

  //로그인
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        //localStorage에 저장
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => console.log(error));
  };

  //로그아웃
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({}); //user정보 초기화
        localStorage.removeItem("userData");
        navigate("/"); //login 페이지로 이동
      })
      .catch((error) => alert(error.messages));
  };

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="Disney Plus logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        ></img>
      </Logo>
      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input
            value={searchValue}
            onChange={handleChange}
            type="text"
            className="nav__input"
            placeholder="검색해주세요"
          />
          <SignOut>
            <UserImg
              src={userData.photoURL}
              alt={userData.displayName}
            ></UserImg>
            <DropDown>
              <span className="sign" onClick={handleLogOut}>
                SignOut
              </span>
            </DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  );
};

export default Nav;

const DropDown = styled.div`
  position: absolute;
  top: 55px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 140%;
  opacity: 0;
  span {
    margin-right: 10px;
  }
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  jusitify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
const UserImg = styled.img`
  border-radius: 50%;
  width: 95%;
  height: 95%;
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: black;
    border-color: transparent;
  }
`;
const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.58);
  border-radius: 5px;
  border: none;
  padding: 5px;
  outline-color: white;
  outline-width: 1px;
  color: white;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;
