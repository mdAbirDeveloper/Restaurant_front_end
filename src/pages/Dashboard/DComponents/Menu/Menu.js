import AdminLayout from "../../AdminLayout/AdminLayout";


const Menu = () => {
  return (
    <div>Menu</div>
  )
}

export default Menu;

Menu.getLayout = function getLayout(page){
    return <AdminLayout>{page}</AdminLayout>
}