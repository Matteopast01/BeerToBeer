import "./firebase/conf-firebase.js"
import * as storage from "./firebase/storage/manage_storage.js"
import * as database from "./firebase/firestore-database/crud-op.js"
import * as beer_database from "./BeerApi/BeerApiHandler.js"

// firebase function
/**
 * store an object in the database
 * @param obj obj to store
 * @param collection_name name of the object collection (table)
 * @param error error function
 * @param postprocessing postprocessing function
 * @returns {Promise<void>}
 */
export const store_rew =  async function (obj, collection_name, error= ()=>{}, postprocessing = ()=>{}) {
   return database.store_rew(obj, collection_name, error, postprocessing)
}

/**
 * store an object in the database and set its id
 * @param obj obj to store
 * @param collection_name name of the object collection (table)
 * @param id id
 * @param error error function
 * @param postprocessing postprocessing function
 * @returns {Promise<void>}
 */
export const store_rew_byid = async function (obj, collection_name, id, error= ()=>{}, postprocessing = ()=>{}) {
   return database.store_rew_byid(obj, collection_name, id, error, postprocessing)
}

/**
 * load object
 * @param collection_name name of the object collection (table)
 * @param id id of the obj in the database
 * @param postprocessing postprocessing function
 * @param error error function
 * @param do_not_exist do_not_exist function
 * @returns {Promise<*|undefined>}
 */
export const load_rew = async function (collection_name, id, postprocessing, error = ()=>{}, do_not_exist = ()=>{}){
    return database.load_rew(collection_name, id, postprocessing, error, do_not_exist)
}

/**
 * updete an obj in the database
 * @param obj obj with new values
 * @param collection_name name of the object collection (table)
 * @param id id of the obj in the database
 * @param error error function
 * @param postprocessing postprocessing function
 * @param do_not_exist do_not_exist function
 * @returns {Promise<void>}
 */
export const update_rew = async function (obj, collection_name, id, error = ()=>{}, postprocessing = ()=>{}, do_not_exist = ()=>{}){
    return database.update_rew(obj, collection_name, id, error, postprocessing, do_not_exist)
}

/**
 * updete an obj in the database applyng a function
 * @param collection_name name of the object collection (table)
 * @param attribute_name atribute for the where clouse
 * @param attribute attribute value
 * @param update_function function with witch update the object
 * @returns {Promise<void>}
 */
export const update_by_function =  async function (collection_name,attribute_name, attribute, update_function ){
    return database.update_by_function(collection_name,attribute_name, attribute, update_function)
}

/**
 * delete an document (tuple)
 * @param collection_name name of the object collection (table)
 * @param id id of the document
 * @param error error function
 * @param postprocessing postprocessing function
 * @returns {Promise<void>}
 */
export const delete_rew = async function(collection_name, id, error = ()=>{}, postprocessing = ()=>{}){
    return database.delete_rew(collection_name, id, error, postprocessing)
}

/**
 * count number of results
 * @param attribute_val attribute value
 * @param collection_name name of the object collection (table)
 * @param attribute_name atribute for the where clouse
 * @returns {Promise<*|undefined>}
 */
export const count_objs = async function(attribute_val, collection_name, attribute_name){
    return database.count_objs(attribute_val, collection_name, attribute_name)
}

/**
 * query a document
 * @param attribute attribute value
 * @param collection_name name of the object collection (table)
 * @param attribute_name atribute name
 * @param limit_number max number of results
 * @param order_by attribute to order
 * @param order_direction order direction (Desc, asc)
 * @param error error function
 * @param postprocessing postprocessing function
 * @param do_not_exist do_not_exist function
 * @returns {Promise<*|undefined>}
 */
export const get_by_attribute = async function(attribute, collection_name, attribute_name, limit_number=null, order_by =null, order_direction = "asc", error = ()=>{}, postprocessing = ()=>{}, do_not_exist = ()=>{}){
    return database.get_by_attribute(attribute, collection_name, attribute_name, limit_number, order_by, order_direction , error , postprocessing , do_not_exist )
}

/**
 * query a document by an attribute start string
 * @param collection_name name of the object collection (table)
 * @param attribute attribute value
 * @param search_word start str
 * @param order_by_field attribute to order
 * @param max_item_number max number of results
 * @param error error function
 * @param postprocessing postprocessing function
 * @returns {Promise<*|undefined>}
 */
export const query_by_preamble = async function (collection_name, attribute, search_word, order_by_field, max_item_number = null, error = ()=>{}, postprocessing = ()=>{}) {
    return database.query_by_preamble(collection_name, attribute, search_word, order_by_field, max_item_number , error , postprocessing )
}

/**
 * load object ordered by
 * @param collection_name name of the object collection (table)
 * @param order_by_field attribute to order
 * @param order_direction (asc/desc)
 * @param max_item_number max number of results
 * @param error error function
 * @param postprocessing postprocessing function
 * @returns {Promise<*[]|undefined>}
 */
export const load_ordered = async function (collection_name, order_by_field, order_direction="asc", max_item_number = null, error = ()=>{}, postprocessing = ()=>{}) {
    return database.load_ordered(collection_name,order_by_field,order_direction,max_item_number,error,postprocessing)
}




// storage
/**
 * upload an img
 * @param path_img path of the img
 * @param file name to databese
 * @param postprocessing postprocessing function
 * @param error error function
 * @returns {Promise<void>}
 */
export let push_img = async function (path_img, file,  postprocessing= ()=>{}, error = ()=>{}) {
    return storage.push_img(path_img, file,  postprocessing, error)
}

/**
 * get image
 * @param path_img path of the img
 * @param postprocessing postprocessing function
 * @param error error function
 * @returns {Promise<void>}
 */
export let pull_img_url = async function (path_img, postprocessing= ()=>{}, error = ()=>{}){
    return storage.pull_img_url(path_img, postprocessing, error)
}


// api_beer

/**
 * get beer by name (or partial name)
 * @param name name of beer (or partial name)
 * @param postprocessing postprocessing function
 * @param error error function
 * @returns {Promise<any>}
 */
export async function requestBeersByName(name, postprocessing = ()=>{}, error = ()=>{}) {
    return beer_database.requestBeersByName(name, postprocessing, error)
}

/**
 * get beer by id
 * @param id id of the beer
 * @param postprocessing postprocessing function
 * @param error error function
 * @returns {Promise<any|undefined>}
 */
export async function requestBeersById(id, postprocessing = ()=>{}, error = ()=>{}) {
    return beer_database.requestBeersById(id, postprocessing , error )
}

/**
 * get random beer
 * @param postprocessing postprocessing function
 * @param error error function
 * @returns {Promise<any|undefined>}
 */
export async function requestRandomBeer( postprocessing = ()=>{}, error = ()=>{}) {
    return beer_database.requestRandomBeer(postprocessing , error )
}

