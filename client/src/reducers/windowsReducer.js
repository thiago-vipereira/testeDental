import { 
    ADD_WINDOWS,
    UPDATE_WINDOWS,
    CLEAR_WINDOWS,
    REMOVE_WINDOWS,
} from '../actions/windowsController';
 
export default function(state = {}, action) {
    
    function addWindows(windows, payload ){
        if(windows == null){
            windows = [];
            windows.push(payload);
        }else{
            var exist = false;
            windows.map( win =>{
                if(win.id == payload.id && win.type == payload.type){
                    win.opened = true;
                    exist = true;
                }
            });
            if(!exist){
                windows.push(payload);
            }
        }
        return windows;
    };

    function updateWindows( windows, payload ){
        windows.find((item) => {
            if(item.id == payload.id){
                item = payload;
                return true;
            }
            return false;
        });
        return windows;
    };

    switch(action.type) { 
        case ADD_WINDOWS:
            return { ...state, windows: addWindows(state.windows, action.payload) };
        case UPDATE_WINDOWS:
            return { ...state, windows: updateWindows(state.windows, action.payload) };
        case REMOVE_WINDOWS:
            return { ...state, windows: action.payload };
        case CLEAR_WINDOWS:
            return { ...state, windows: null };
        default: 
            return state; 
    } 
}