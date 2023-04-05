import { platesTypes } from "../types/platesTypes";
import { getItemsActionAsync, getItemsByIdActionAsync, getFilterItemsActionAsync, getItemsSubCollectionActionAsync } from '../../services/crudColection';

export const getPlateActionAsync = (idRestaurant) => {
    return async (dispatch) => {
      try {
        const plates = await getItemsActionAsync(`restaurants/${idRestaurant}/plates`);
        dispatch(getPlateAction(plates));
      } catch (error) {
        dispatch(getPlateAction([]));
      }
    };
};

export const getFilterPlatesActionAsync = (wordSearch) => {
  return async (dispatch) => {
    try {
      const plates = await getItemsSubCollectionActionAsync("plates");
      const filterPLate= plates.filter(item=> item.name.toLowerCase().includes(wordSearch.toLowerCase()))
      dispatch(getPlateAction(filterPLate));
    } catch (error) {
      dispatch(getPlateAction([]));
    }
  };
};

const getPlateAction = (plates) => {
    return {
      type: platesTypes.GET_PLATES,
      payload: [...plates],
    };
};


export const getPlateByIdActionAsync = (idRestaurant,idPlate) => {
  return async (dispatch) => {
    try {
      const plates = await getItemsByIdActionAsync(`restaurants/${idRestaurant}/plates`, idPlate);
      dispatch(getPlateByIdAction(plates));
    } catch (error) {
      dispatch(getPlateByIdAction({}));
    }
  };
}

const getPlateByIdAction = (plates) => {
  return {
    type: platesTypes.CURRENT_PLATE,
    payload: plates,
  };
};

export const getFilterPlateActionAsync = (item, filter, idRestaurant) => {
  return async (dispatch) => {
    try {
      let plates
      if(item && filter){
          plates = await getFilterItemsActionAsync(`restaurants/${idRestaurant}/plates`,[filter, '==', item]);
      } else{
        plates = await getItemsActionAsync(`restaurants/${idRestaurant}/plates`);
      }
      dispatch(getFilterPlateAction(plates));
    } catch (error) {
      dispatch(getFilterPlateAction([]));
    }
  };
};

const getFilterPlateAction = (plates) => {
  return {
    type: platesTypes.GET_PLATES,
    payload: [...plates],
  };
};