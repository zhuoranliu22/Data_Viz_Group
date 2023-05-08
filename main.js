mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1b3JhbmxpdSIsImEiOiJjbGQxbDR6M2QyN2s5M3BudnhrZGV0bTRyIn0.dG9Q884uSu_yGHLnc0KLnA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.0060, 40.7128], // Set the initial map center (longitude, latitude)
    zoom: 10
});


map.on('load', () => {
    map.addSource('displacement', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/zhuoranliu22/Data_Viz_Group/main/data_group_viz.json'
    });

    map.addLayer({
        id: 'displacement',
        type: 'fill',
        source: 'displacement',
        layout: {},
        paint: {
            'fill-color': [
                'match',
                ['get', 'DsplcRI'],
                'Lowest', '#F2F12D',
                'Lower', '#EED322',
                'Intermediate', '#E6B71E',
                'Higher', '#DA9C20',
                'Highest', '#CA8323',
                '#000000' // fallback color if none of the categories match
            ],
            'fill-opacity': 0.8
            
            
        }
    });
});

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

const propertiesToDisplay = {
    'NTAName': 'Name',
    'DsplcRI': 'Displacement Risk'
    
};

const panelProperties = {
    'NTAName': 'Name',
    'DsplcRI': 'Displacement Risk'
    
    // Add more properties as needed
};

map.on('click', 'displacement', (e) => {
    // Get the properties of the clicked feature
    const properties = e.features[0].properties;
    

    // Generate the content for the popup
    
    let popupContent = '<h3>Basic Information</h3><ul>';
    
    for (const originalProperty in propertiesToDisplay) {
        if (properties.hasOwnProperty(originalProperty)) {
            const displayName = propertiesToDisplay[originalProperty];
            popupContent += `<li>${displayName}: ${properties[originalProperty]}</li>`;
        }
    }
    popupContent += '</ul>';

    // Generate the content for the info panel
    let infoPanelContent = '<h3>Feature Information</h3><ul>';
    for (const originalProperty in panelProperties) {
        if (properties.hasOwnProperty(originalProperty)) {
            const displayName = panelProperties[originalProperty];
            infoPanelContent += `<li><strong>${displayName}:</strong> ${properties[originalProperty]}</li>`;
        }
    }
    infoPanelContent += '</ul>';

    // Set the popup content and location, and add it to the map
    popup.setLngLat(e.lngLat)
        .setHTML(popupContent)
        .addTo(map);

    // Set the info panel content
    document.getElementById('feature-properties').innerHTML = infoPanelContent;
});

map.on('mouseenter', 'displacement', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'displacement', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});


