import {Navigate} from 'react-router-dom';

interface AdminRouteProps {
    children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUserEmail = localStorage.getItem('currentUserEmail') || sessionStorage.getItem('currentUserEmail');
    const matchedUser = users.find((user: {email: string}) => user.email === currentUserEmail);
    
    if(!matchedUser || !matchedUser.isAdmin) {
        return <Navigate to = '/login' replace />
    }

    return <>{children}</>;
}