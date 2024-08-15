// src/components/MapComponent.tsx
import React, { Key } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

interface ImovelProps {
  cep: Key | null | undefined;
  nome: string;
  fachada: string;
  rua: string;
  num: string;
  bairro: string;
  cidade: string;
  planta: {
    preco: number;
  };
  location: {
    _lat: number;
    _long: number;
  };
}

interface MapComponentProps {
  imoveis: ImovelProps[];
}

const MapCenterSetter: React.FC<{ position: LatLngExpression }> = ({
  position,
}) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(position);
  }, [map, position]);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ imoveis }) => {
  // Defina um local padrão se não houver imóveis
  const defaultPosition: LatLngExpression = [0, 0];

  // Se houver imóveis, defina a posição central como o local do primeiro imóvel
  const centerPosition: LatLngExpression =
    imoveis.length > 0
      ? [imoveis[0].location._lat, imoveis[0].location._long]
      : defaultPosition;

  return (
    <MapContainer
      style={{ height: "400px", width: "100%" }}
      center={centerPosition} // Remove esta linha
      zoom={14}
      scrollWheelZoom={false} // Opcional, dependendo das necessidades
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapCenterSetter position={centerPosition} />
      {imoveis.map((imovel) => (
        <Marker
          key={imovel.cep}
          position={
            [imovel.location._lat, imovel.location._long] as LatLngExpression
          }
        >
          <Popup>
            <div>
              <img
                src={imovel.fachada}
                alt={imovel.nome}
                style={{ width: "100px", height: "60px", objectFit: "cover" }}
              />
              <h3>{imovel.nome}</h3>
              <p>
                {imovel.rua}, {imovel.num} - {imovel.bairro}, {imovel.cidade}
              </p>
              <p>Preço: R$ {imovel.planta.preco.toLocaleString()}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
