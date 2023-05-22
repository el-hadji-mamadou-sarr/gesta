import { useEffect } from "react";
import { logout } from "../../api/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../reducers/userReducer";

export const Logout = ()=>{
        const navigate = useNavigate();
        const dispatch = useDispatch();
        useEffect(()=>{
                logout().then(()=>{
                        navigate('/');
                        dispatch(logoutUser());
                })
        })
        return (
                <>
                </>
        );
}