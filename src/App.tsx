import React, { Component, CSSProperties } from "react";
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Layout, Menu } from "antd";
import { RestOutlined } from "@ant-design/icons";
import Logo from './component/Logo'
import Out from './component/SignOut'
interface Props{}
interface State {
  collapsed:boolean;
  username: string;
  password: string;
  isLoggedIn: boolean;
}
export interface CurrentUser {
  username: string;
  password: string;
}

interface CustomMenuItem {
  key: string;
  label: string;
  icon?:any;
  href?: string;
  children?: CustomMenuItem[];
}

const { Header, Sider } = Layout;

const headerStyle: CSSProperties = {
  textAlign: "center",
 
  height: 64,
  lineHeight: "64px",
  background: "#0f0431 ",
};



const layoutStyle: CSSProperties = {
  overflow: "hidden",
  width: "100%",
  height: "100vh",
};

const items: CustomMenuItem[] = [
  {
    key:"",
    label:"",
    icon: <Logo/>,
  },
  {
    key: "item01",
    label: "Quản lý sản phẩm",
    icon: <i className="fa-brands fa-product-hunt"></i>,
    children: [
      {
        key: "item02",
        label: "Đồ Ăn Chính",
        href:"/page/DoAn",
        icon: <i className="fa-solid fa-bowl-food"></i>,
      },
      {
        key: "item03",
        label: "Nước Uống",
        href:"/page/NuocUong",
        icon: <RestOutlined />,
      },
      {
        key:"item04",
        label:"Món Chán Miệng",
        href:"/page/MonChanMieng",
        icon:<i className="fa-solid fa-carrot"></i>,
      },
    ],
  },
  {
    key:"item05",
    label:"Hệ Thống Quản Lý",
    
    icon:<i className="fa-solid fa-gear"></i>,
    children:[
      {
        key:"item06",
        label:"Quản Lý Nhân Viên",
        href:"/page/NhanVien",
        icon:<i className="fa-solid fa-user"></i>,
      },
      {
        key:"item07",
        label:"Quản Lý Đơn Đặt Hàng",
        href:"/page/DonHang",
        icon:<i className="fa-solid fa-cart-shopping"></i>,
      }
    ],
  },
  {
    key:"item09",
    label:"Khách Hàng",
    href:"/page/KhachHang",
    icon:<i className="fa-solid fa-users"></i>,
  },
 
  
];

class App extends Component<Props,State> {
  constructor(props: Props) {
    super(props);
    const jsonUser: string | null = localStorage.getItem("isLoggedIn");
    const user: CurrentUser = jsonUser !== null && JSON.parse(jsonUser);

    this.state = {
      collapsed: false,
      username: "",
      password: "",
      isLoggedIn: user.username === "admin" && user.password === "123",
    };
  }
  
  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  renderMenuItems = (items: CustomMenuItem[]) => {
    return items.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
            {this.renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.href || "#"}>{item.label}</Link>
        </Menu.Item>
      );
    });
  };

  render() {
    return this.state.isLoggedIn?(
      <Layout style={layoutStyle}>
        
        <Sider
          width={236}
        >
         
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["item01"]}
          >
            {this.renderMenuItems(items)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <Out/>
          </Header>
          <Outlet /> 
        </Layout>
        
      </Layout>
    ):(
      <Navigate to = {"/"}/>
    )
  }
}

export default App;
