import { useReducer } from 'react';
import { mapReducer, mapInitialStore } from '../store/reducers/mapReducer';
import { MapActionsTypes } from '../store/actions/actionsTypes';



const useMap = () => {
    const [state, dispatch] = useReducer(mapReducer, mapInitialStore);
    const actions = {
        addLayer: (layer) => dispatch({ type: MapActionsTypes.add_layer, payload: layer }),
        removeLayer: (layer) => dispatch({ type: MapActionsTypes.delete_layer, payload: layer }),
        toggle_loading_layers: () => dispatch({ type: MapActionsTypes.toggle_loading_layers }),
        delete_layer_by_name: (name) => dispatch({ type: MapActionsTypes.delete_layer_by_name,payload: name }),
        delete_all_layers: () => dispatch({ type: MapActionsTypes.delete_all_layers }),
        reset_map: () => dispatch({ type: MapActionsTypes.reset_map }),
        add_click_event: (event) => dispatch({ type: MapActionsTypes.add_click_event, payload: event }),
        add_load_start_event: (event) => dispatch({ type: MapActionsTypes.add_load_start_event, payload: event }),
        add_load_end_event: (event) => dispatch({ type: MapActionsTypes.add_load_end_event, payload: event }),
        add_pointer_move_event: (event) => dispatch({ type: MapActionsTypes.add_pointer_move_event, payload: event }),
        set_extent: (extent) => dispatch({ type: MapActionsTypes.set_extent, payload: extent }),
    };
    return { state, actions };
}

export { useMap };