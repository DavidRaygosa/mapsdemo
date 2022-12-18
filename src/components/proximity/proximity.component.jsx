import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeComponent } from '../navbar/navbar.reducer';
import mapboxgl from '!mapbox-gl';
import PureCounter from "@srexi/purecounterjs/js/purecounter";
import { ColorPicker } from 'primereact/colorpicker';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import './proximity.component.css';

const Proximity = () => {
    const dispatch = useDispatch();
    const [fillColor, setFillColor] = useState("ff0000");
    const [opacity, setOpacity] = useState(0.5);
    const [map, setMap] = useState(null);

    const [selectedCities, setSelectedCities] = useState(null);    

    const changeFillColor = (hexadecimalColor) => {
        setFillColor(hexadecimalColor);
        map.setPaintProperty('urban-areas-fill', 'fill-color', `#${fillColor}`);
    }

    const changeOpacity = (newOpacity) => {
        setOpacity(newOpacity);
        map.setPaintProperty('urban-areas-fill', 'fill-opacity', newOpacity);
    }


    const cities = [
        { name: 'Walmart', code: 'Wm' },
        { name: 'Nutrisa', code: 'Ns' },
        { name: "Domino's", code: 'Ds' },
        { name: 'Krispy kreme', code: 'kyk' }
    ];

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRyYXk5NyIsImEiOiJjbGJzbDY2eHYwNDA0M29wZnNnYjFpYXQxIn0.5kIfz3O-id-TKTy5JcfFiA';
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-102, 23],
            zoom: 5.5,
        });
        
        map.on('load', () => {
            const layers = map.getStyle().layers;
            let firstSymbolId;
            for (const layer of layers) {
                if (layer.type === 'symbol') {
                    firstSymbolId = layer.id;
                    break;
                }
            }
             
            map.addSource('urban-areas', {
                'type': 'geojson',
                'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson'
            });
            map.addLayer(
                {
                    'id': 'urban-areas-fill',
                    'type': 'fill',
                    'source': 'urban-areas',
                    'layout': {},
                    'paint': {
                        'fill-color': `#${fillColor}`,
                        'fill-opacity': 0.5
                    }
                },
                firstSymbolId
            );

            setMap(map);
        });

        new PureCounter({
            selector: ".purecounter"
        });
        // eslint-disable-next-line
    },[]);
    useEffect(() => {
        dispatch(changeComponent('Proximity'));
    },[dispatch]);
    return(
        <section id='proximity-container' className='d-flex flex-row h-100'>

            {/* Left panel */}
            <aside id='proximity-aside-left' className='col-3 h-100 bg-light'>
                { /* Left panel settings */ }
                <div id='proximity-aside-left-settings' className='col-12 h-25 bg-white px-3 d-flex flex-column justify-content-evenly'>
                    <div className='col-12 d-flex flex-row align-items-center'>
                        <div className='d-flex flex-column col-8'>
                            <span className='proximity-aside-left-title'>Set Color</span>
                            <span className='text-muted'>Set Color</span>
                        </div>
                        <div className='col-4 d-flex justify-content-end'>
                            <ColorPicker value={fillColor} onChange={(e) => changeFillColor(e.value)} />
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row align-items-center'>
                        <div className='d-flex flex-column col-8'>
                            <span className='proximity-aside-left-title'>Set Opacity</span>
                            <span className='text-muted'>Set Opacity</span>
                        </div>
                        <div className='col-4 d-flex flex-column justify-content-end align-items-center mt-2'>
                            <Slider value={opacity} min={0} max={1} step={.1} style={{ width: '100%' }} onChange={(e) => changeOpacity(e.value)} />
                            <span className='d-block mt-2 text-muted'>{opacity}</span>
                        </div>
                    </div>
                </div>
                { /* Left panel filters */ }
                <div className='col-12 h-50 p-3'>
                    {/* Left panel filters buttons */}
                    <div className='col-12 d-flex flex-row justify-content-between'>
                        <Button label="Add Places" className="p-button-outlined p-button-help" icon="pi pi-map-marker" iconPos="left" style={{ width: '200px' }} />
                        <Button label="Add Filter" className="p-button-outlined p-button-help" icon="pi pi-filter" iconPos="left" style={{ width: '200px' }} />
                    </div>
                    {/* Left panel places */}
                    <div className='col-12 mt-4'>
                        <span className='text-muted'>Set Summary</span>
                        <MultiSelect 
                            value={selectedCities} 
                            options={cities} 
                            onChange={(e) => setSelectedCities(e.value)} 
                            optionLabel="name" 
                            placeholder="Select a place" 
                            display="chip" 
                            style={{ width: '100%' }}
                            filter
                        />
                    </div>
                </div>
                <div className='col-12 h-25 p-3 d-flex flex-row justify-content-evenly align-items-center'>
                    <Button label="Finish" className="p-button-help" style={{ width: '150px' }} />
                    <Button label="Cancel" className="p-button-outlined p-button-help" style={{ width: '150px' }} />
                </div>
            </aside>
            
            <article id='proximity-map-container' className='col-7 h-100'>
                <div className='col-12 h-100' id="map"></div>
            </article>

            <aside id='proximity-aside-right' className='col-2 bg-light'>
                <div id='proximity-aside-right-reach' className='p-3'>
                    <span className='proximity-aside-left-title'>Reach</span>
                    <p style={{ fontWeight: 600 }}>Calculated based on the most recent month of source data</p>
                    <Button label="Calculate Reach" style={{ width: '150px' }} />
                </div>
                <div className='p-3'>
                    <div className='d-flex flex-column mt-4'>
                        <span className='proximity-aside-left-title'>Devices</span>
                        <span 
                            data-purecounter-start="0"
                            data-purecounter-end="800000"
                            data-purecounter-separator=","
                            data-purecounter-duration="3"
                            className="purecounter"
                            style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 600 }}>0</span>
                    </div>
                    <div className='d-flex flex-column mt-4'>
                        <span className='proximity-aside-left-title'>Impresssion Capacity</span>
                        <span 
                            data-purecounter-start="0"
                            data-purecounter-end="500000000"
                            data-purecounter-separator=","
                            data-purecounter-duration="3"
                            className="purecounter"
                            style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 600 }}>0</span>
                    </div>
                    <div className='d-flex flex-column mt-4'>
                        <span className='proximity-aside-left-title'>% of Network</span>
                        <span 
                            data-purecounter-start="0"
                            data-purecounter-end="0.30"
                            data-purecounter-duration="3"
                            data-purcounter-decimals="2"
                            data-purecounter-currency="%"
                            data-purecounter-formater="es-MX"
                            className="purecounter"
                            style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 600 }}>0</span>
                    </div>
                </div>
            </aside>

        </section>
    )
}

export default Proximity;