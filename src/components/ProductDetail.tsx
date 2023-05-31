import {useParams} from "react-router-dom";
import Product from './Product';

function GetId() {

    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <Product id={id} />
        </div>
    );
}

export default GetId;