import { CDN_URL } from "../utils/constant";

const ResturantCard = ( {resData} ) => {
    // const { resData } = props;

    return (
        <div className="res-card">
            <img
                className="res-logo"
                src={CDN_URL + resData.cloudinaryImageId}
                alt="res-logo"
            />
            
            <h3> {resData.name} </h3>
            <h4> {resData.cuisines.join(", ")} </h4>
            <h4> {resData.avgRating} Stars </h4>
            <h4> {resData.costForTwo} FOR TWO </h4>
            <h4> {resData.deliveryTime} </h4>
            <h4> {resData.sla?.slaString} </h4>
            

        </div>
    );
};

export default ResturantCard;