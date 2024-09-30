// // import { Mail } from "@material-ui/icons";
// // import { Icon, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
// // import path from "path";
// // import React, { ReactNode } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { text } from "stream/consumers";

// // export interface IMenuItemProps {
// //     text: string;
// //     icone: React.ReactNode;
// //     link: string;
// // }

// // const MenuItemComponent: React.FC<IMenuItemProps> = (props) => {
// //     const history = useNavigate();

// //     const handleClicker = () =>{
// //         history(`${props.link}`)
// //     }
    
// //     return (
// //         <ListItem disablePadding>
// //             <ListItemButton onClick={handleClicker}>
// //                 <ListItemIcon>
// //                     {props.icone}
// //                 </ListItemIcon>
// //                 <ListItemText primary={props.text}/>
// //             </ListItemButton>
// //         </ListItem>
// //     );
// // }

// // export default MenuItemComponent;

// // Exemplo de MenuItemComponent.tsx
// import React from 'react';
// import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export interface IMenuItemProps {
//     text: string;
//     icon: React.ReactNode;
//     link: string;
//     isDisabled?: boolean; 
// }

// const MenuItemComponent: React.FC<IMenuItemProps> = (props) => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         if (!props.isDisabled) {
//             navigate(props.link);
//         }
//     };

//     return (
//         <ListItem disablePadding>
//             <ListItemButton onClick={handleClick} disabled={props.isDisabled}>
//                 <ListItemIcon>
//                     {props.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={props.text} />
//             </ListItemButton>
//         </ListItem>
//     );
// };

// export default MenuItemComponent;

export {}; // Adiciona uma exportação vazia para que o arquivo seja considerado um módulo
