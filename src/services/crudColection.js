import { dataBase } from "../firebase/FirebaseConfig";
import { getDocs, query, where, collection, addDoc, doc, getDoc  } from "firebase/firestore";

export const getFilterItemsActionAsync = async (collectionName, filter) => {
    try {
        const toDoCollection = collection(dataBase, collectionName);
        const queryCollection = query(toDoCollection, where(...filter))
        const itemDoc = await getDocs(queryCollection);
        const item = [];
        itemDoc.forEach((doc) => {
            item.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return item
    } catch (error) {
        console.error(error)
    }
};

export const getItemsByIdActionAsync = async (collectionName, id) => {
    try {
        const toDoCollection = doc(dataBase, collectionName,id);
        const itemDoc = await getDoc(toDoCollection);
        const item = itemDoc.data();
        return item
    } catch (error) {
        console.error(error)
    }
};

export const createItemActionAsync = async (item,collectionName) => {
    try {
        const toDoCollection = collection(dataBase, collectionName);
        const doc = await addDoc(toDoCollection, item);
        const itemDoc = {
            item: { id: doc.id, ...item },
            status: "success",
        };
        return itemDoc;
    } catch (error) {
        console.log(error);
    }
};

export const getItemsActionAsync = async (collectionName) => {
    try {
        const toDoCollection = collection(dataBase, collectionName);
        const querySnapshot = await getDocs(toDoCollection);
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return items
    } catch (error) {
        console.log(error);
    }
};
