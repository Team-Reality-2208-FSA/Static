import React, { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup } from "react-leaflet";
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";





function MapLayer({center}) {
    const map = useMap();
    return (
        <Marker
          eventHandlers={{
            click: () => {
              map.setView(center,7);
            }
          }}
          position={{
            lat:center[0],
            lng: center[1]
          }}
        >
          <Popup>
            <span>Heyy</span>
          </Popup>
        </Marker>
    )
}

export default MapLayer;
