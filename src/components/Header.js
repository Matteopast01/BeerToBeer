import CustomButton from "./CustomButton";
import CustomIconButton from "./CustomIconButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from "./SearchBar";

function Header(){

    const propsSearch = {
        onSearch: function () {
            // TODO
        }
    }

    const propsAccount = {
        icon: <AccountCircleIcon />,
        sx: { color: '#333333'},
        size: "large"
    }

    const propsHome = {
        text: "Home",
        sx: { color: '#333333'},
        size: "small"
    }

    const propsPubs = {
        text: "Our Pubs",
        sx: { color: '#333333'},
        size: "small"
    }

    const propsAdvancedSearch = {
        text:"Advanced Search",
        sx: { color: '#333333'},
        size: "small"
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SearchBar {...propsSearch}/>
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