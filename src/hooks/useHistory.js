
const useHistory = (handlePopstate, url)=>{
    const realHandlePopstate = ()=>{
        const url = window.location.href;
        const urlSegments = new URL(url).pathname.split('/');
        const lastParam = urlSegments[urlSegments.length - 1];
        handlePopstate(lastParam)
    }

    const onParameterChange = (newParameter)=>{
        if (!window.location.href.includes(newParameter)) {
            window.history.pushState({}, '', `/${url}/${newParameter}`);
        }
        window.addEventListener('popstate', realHandlePopstate);
    }

    const onRollback = () =>{
        window.removeEventListener('popstate', realHandlePopstate);
    }

    return [ onParameterChange, onRollback ];

}

export default useHistory