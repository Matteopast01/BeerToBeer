import CustomIconButton from "./CustomIconButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';

function Header(){

    let children = <AccountCircleIcon />
    const color = "primary"
    const propsAccount = {children, color}
    children = <HomeIcon />
    const propsHome = {children, color}


    return (
        <div>
            <div style={{textAlign: 'right'}}>
                <CustomIconButton {...propsAccount}/>
            </div>
            <div style={{textAlign: 'center', fontSize: '28px'}}>
                <b>BeerToBeer</b>
            </div>
            <div style={{textAlign: 'center'}}>
                <CustomIconButton {...propsHome}/>

            </div>
        </div>
    );

}

export default Header;