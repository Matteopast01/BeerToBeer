import CustomButton from "./CustomButton";
import CustomIconButton from "./CustomIconButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header(){

    const propsAccount = {
        icon: <AccountCircleIcon />,
        color: "primary",
        size: "large"
    }

    const propsHome = {
        text: "Home",
        color: "primary",
        size: "small"
    }

    const propsPubs = {
        text: "Our Pubs",
        color: "primary",
        size: "small"
    }

    const propsAdvancedSearch = {
        text:"Advanced Search",
        color: "primary",
        size: "small"
    }

    return (
        <div>
            <div style={{textAlign: 'right'}}>
                <CustomIconButton {...propsAccount}/>
            </div>

            <div style={{textAlign: 'center', fontSize: '30px'}}>
                <b>BeerToBeer</b>
            </div>

            <div style={{textAlign: 'center'}}>
                <CustomButton {...propsHome}/>
                <CustomButton {...propsPubs}/>
                <CustomButton {...propsAdvancedSearch}/>
            </div>
        </div>
    );
}

export default Header;