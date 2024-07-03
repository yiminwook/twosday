import { createBtn, menuList } from "./sidebar.css";
import { FaPencilAlt } from "react-icons/fa";

export default function SidebarMenuList() {
  return (
    <ul className={menuList}>
      <li>HOME</li>
      <li>Search</li>
      <li>Notifications</li>
      <li className={createBtn}>
        <FaPencilAlt />
        Create
      </li>
    </ul>
  );
}
