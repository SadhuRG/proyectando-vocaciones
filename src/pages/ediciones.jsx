import { useParams } from 'react-router-dom';
import { editionsData } from '../data/editionsData';
import '../css/ediciones.css';

const Edicion = () => {
    const { version } = useParams();
    const data = editionsData.find(ed => ed.version === version) || editionsData[editionsData.length - 1];

    return (
        <div className="ediciones-page" data-edition={data.version}>
            <div className="edition-full-content">
                <div className="edition-content-header">
                    <h1>{data.titulo}</h1>
                    <p>{data.fecha}</p>
                </div>
            </div>
        </div>
    );
};

export default Edicion;