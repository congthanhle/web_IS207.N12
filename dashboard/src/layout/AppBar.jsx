import * as React from 'react';
import { AppBar, Logout, UserMenu } from 'react-admin';

const CustomUserMenu = () => (
  <UserMenu>
      <Logout />
  </UserMenu>
);

export default function MyAppBar(props){
  return(
    <AppBar
    sx={{
        "& .RaAppBar-title": {
            flex: 1,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
        },
        bgcolor: '#ff781f'
    }}
    userMenu={<CustomUserMenu />}
    {...props}
>    
</AppBar>

  );

};