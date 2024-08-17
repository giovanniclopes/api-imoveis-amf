import { useEffect, useState } from "react";
import { fetchImoveis } from "../api/apiImoveis";

interface ImovelProps {
  distance: number;
  bairro: string;
  cep: string;
  cidade: string;
  fachada: string;
  nome: string;
  num: string;
  rua: string;
  planta: {
    dorms: number | "0";
    metragem: number;
    preco: number;
    vagas: number | "0";
  };
  location: {
    _lat: number;
    _long: number;
  };
}

const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const Radius = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Radius * c;
};

export function ImoveisNearby() {
  const [imoveis, setImoveis] = useState<ImovelProps[]>([]);
  const [nearestImoveis, setNearestImoveis] = useState<ImovelProps[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [requestingLocation, setRequestingLocation] = useState(false);

  const getLocation = () => {
    setLocationError(null);
    setRequestingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setRequestingLocation(false);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          setLocationError(
            "Não foi possível obter a localização. Verifique suas permissões e configurações de localização."
          );
          setRequestingLocation(false);
        },
        { timeout: 10000 }
      );
    } else {
      setLocationError("Geolocalização não é suportada pelo seu navegador.");
      setRequestingLocation(false);
    }
  };

  useEffect(() => {
    const loadImoveis = async () => {
      try {
        const data = await fetchImoveis();
        setImoveis(data);
      } catch (error) {
        console.error("Erro ao carregar imóveis:", error);
      }
    };
    loadImoveis();
    getLocation();
  }, []);

  useEffect(() => {
    if (userLocation && imoveis.length > 0) {
      const sortedImoveis = [...imoveis]
        .map((imovel) => ({
          ...imovel,
          distance: getDistance(
            userLocation.lat,
            userLocation.lon,
            imovel.location._lat,
            imovel.location._long
          ),
        }))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 3);
      setNearestImoveis(sortedImoveis);
    }
  }, [userLocation, imoveis]);

  return (
    <section className="my-16 mt-1 mx-auto w-full mbl:w-full mbl:px-6">
      <div className="mx-6 p-6 border border-gray-100/40 rounded-md">
        <h2 className="text-xl font-medium uppercase mb-4">
          Imóveis próximos a você
        </h2>
        {locationError ? (
          <div>
            <p>{locationError}</p>
            <button
              onClick={getLocation}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Tentar Novamente
            </button>
          </div>
        ) : userLocation ? (
          <div>
            {nearestImoveis.length > 0 ? (
              <div className="flex items-center justify-center mt-10 mbl:flex-col mbl:gap-5">
                {nearestImoveis.map((imovel) => (
                  <div
                    key={imovel.cep}
                    className="flex items-center border-l border-gray-100 p-2 mbl:flex-col mbl:gap-5 mbl:border-b mbl:border-l-0"
                  >
                    <img
                      src={imovel.fachada}
                      alt={imovel.nome}
                      draggable="false"
                      className="w-24 h-16 object-cover rounded mr-4 mbl:w-full mbl:h-24"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-sm">{imovel.nome}</h3>
                      <p className="text-sm">
                        {imovel.rua}, {imovel.num} - {imovel.bairro},{" "}
                        {imovel.cidade}
                      </p>
                      <p className="text-sm">
                        Preço: R$ {imovel.planta.preco?.toLocaleString()}
                      </p>
                      <p className="text-sm">
                        Distância: {(imovel.distance || 0).toFixed(2)} km
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Não há imóveis próximos disponíveis.</p>
            )}
          </div>
        ) : requestingLocation ? (
          <p>Obtendo localização...</p>
        ) : (
          <button
            onClick={getLocation}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Permitir Localização
          </button>
        )}
      </div>
    </section>
  );
}
