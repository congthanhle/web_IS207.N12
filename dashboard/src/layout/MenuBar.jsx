import * as React from 'react';
import { useState } from 'react';
import {MenuItemLink} from 'react-admin';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function NestedList() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', width: 400, bgcolor: 'background.paper', mt: 2 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
       <MenuItemLink to="/order" leftIcon={<ReceiptIcon sx={{ pr: 4,}}/>} primaryText="Orders" sx={{pb: 2}}/>      
       <MenuItemLink to="/user" leftIcon={<PersonIcon sx={{ pr: 4 }}/>} primaryText="Users" sx={{pb: 1}}/>  
       <ListItemButton onClick={handleClick} >
      {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary="Catalog" sx={{ pl: 4 }}/>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{pb: 2}}>
        <List component="div" disablePadding>
          <MenuItemLink sx={{ pl: 5 }} to="/category" leftIcon={<CategoryIcon sx={{ pr: 3 }}/>} primaryText="Categories"/>
          <MenuItemLink sx={{ pl: 5 }} to="/product" leftIcon={<InventoryIcon sx={{ pr: 3 }}/>} primaryText="Products"/>
        </List>
      </Collapse>        
       <MenuItemLink to="/post" leftIcon={<DynamicFeedIcon sx={{ pr: 4 }}/>} primaryText="Posts" sx={{pb: 2}}/>
       <MenuItemLink to="/feedback" leftIcon={<SendIcon sx={{ pr: 4 }}/>} primaryText="Feedback" sx={{pb: 2}}/>
       <MenuItemLink to="/about" leftIcon={<InfoIcon sx={{ pr: 4 }}/>} primaryText="Info" sx={{pb: 2}}/>
    </List>
  );
}
