import { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchImoveis } from "../api/apiImoveis";
import { NearbyImoveis } from "../components/NearbyImoveis";
import { FilterModal } from "../components/FilterModal";
import MapComponent from "../components/LocationMap";

import carIcon from "../assets/icons/car.svg";
import bedroomIcon from "../assets/icons/bedroom.svg";
import configIcon from "../assets/icons/config.svg";
import filterAscendingIcon from "../assets/icons/filter-ascending-blue.svg";
import filterDescendingIcon from "../assets/icons/filter-descending-blue.svg";
import measureIcon from "../assets/icons/measure.svg";

Modal.setAppElement("#root");

interface ImovelProps {
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
    // Adicione esta propriedade
    _lat: number;
    _long: number;
  };
}

export function Home() {
  const [imoveis, setImoveis] = useState<ImovelProps[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // 'asc' para crescente e 'desc' para decrescente
  const [minPreco, setMinPreco] = useState<number>(0);
  const [maxPreco, setMaxPreco] = useState<number>(Infinity);
  const [minDorms, setMinDorms] = useState<number>(0);
  const [maxDorms, setMaxDorms] = useState<number>(10);
  const [minVagas, setMinVagas] = useState<number>(0);
  const [maxVagas, setMaxVagas] = useState<number>(10);

  // Novo estado para a pesquisa
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Novo estado para paginação
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 24;

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
  }, []);

  const filteredAndSortedImoveis = [...imoveis]
    .filter((imovel) => {
      const preco =
        typeof imovel.planta.preco === "string"
          ? parseFloat(imovel.planta.preco)
          : imovel.planta.preco;
      const dorms =
        typeof imovel.planta.dorms === "string"
          ? parseFloat(imovel.planta.dorms)
          : imovel.planta.dorms;
      const vagas =
        typeof imovel.planta.vagas === "string"
          ? parseFloat(imovel.planta.vagas)
          : imovel.planta.vagas;

      // Verifica se o imóvel corresponde à pesquisa
      const matchesSearchQuery =
        imovel.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        imovel.bairro.toLowerCase().includes(searchQuery.toLowerCase()) ||
        imovel.cidade.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesSearchQuery &&
        preco >= minPreco &&
        preco <= maxPreco &&
        dorms >= minDorms &&
        dorms <= maxDorms &&
        vagas >= minVagas &&
        vagas <= maxVagas
      );
    })
    .sort((a, b) => {
      const precoA =
        typeof a.planta.preco === "string"
          ? parseFloat(a.planta.preco)
          : a.planta.preco;
      const precoB =
        typeof b.planta.preco === "string"
          ? parseFloat(b.planta.preco)
          : b.planta.preco;

      if (isNaN(precoA) || isNaN(precoB)) {
        console.error("Preço inválido encontrado:", precoA, precoB);
        return 0;
      }

      return sortOrder === "asc" ? precoA - precoB : precoB - precoA;
    });

  // Função para limpar filtros
  const resetFilters = () => {
    setMinPreco(0);
    setMaxPreco(Infinity);
    setMinDorms(0);
    setMaxDorms(10);
    setMinVagas(0);
    setMaxVagas(10);
    setSearchQuery(""); // Resetar a busca
    setCurrentPage(1); // Voltar para a primeira página
  };

  // Função para mudar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  interface AccordionItemProps {
    title: string;
    content: string;
  }

  const AccordionItem = ({ title, content }: AccordionItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="border-b border-gray-200">
        <button
          onClick={toggleAccordion}
          className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
        >
          <h4 className="text-xl font-semibold text-blue-600">{title}</h4>
          <span
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </button>
        {isOpen && <p className="text-gray-700 pb-4">{content}</p>}
      </div>
    );
  };
  const faqs = [
    {
      title: "O que é um empreendimento imobiliário?",
      content:
        "Um empreendimento imobiliário é um projeto de desenvolvimento urbano que envolve a construção de imóveis residenciais, comerciais ou mistos. Pode incluir a venda de lotes, construção de edifícios, ou desenvolvimento de bairros inteiros.",
    },
    {
      title:
        "Quais são os benefícios de investir em um empreendimento imobiliário?",
      content:
        "Investir em empreendimentos imobiliários pode gerar valorização do patrimônio, renda passiva através de aluguéis, além de segurança financeira a longo prazo. Também oferece a possibilidade de participar do crescimento urbano e da expansão de áreas em desenvolvimento.",
    },
    {
      title:
        "Como posso saber se um empreendimento imobiliário é seguro para investir?",
      content:
        "Verifique a reputação da construtora, o histórico de entrega de projetos anteriores, a localização do empreendimento e a existência de garantias e licenças legais. Aconselha-se também consultar um advogado especializado em direito imobiliário.",
    },
  ];

  // Paginação
  const indexOfLastImovel = currentPage * itemsPerPage;
  const indexOfFirstImovel = indexOfLastImovel - itemsPerPage;
  const currentImoveis = filteredAndSortedImoveis.slice(
    indexOfFirstImovel,
    indexOfLastImovel
  );
  const totalPages = Math.ceil(filteredAndSortedImoveis.length / itemsPerPage);

  return (
    <main id="root" className="container mx-auto p-6 px-12 mbl:px-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Imóveis</h1>
      <NearbyImoveis />

      {/* Componente FilterModal */}
      <FilterModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        minPreco={minPreco}
        maxPreco={maxPreco}
        minDorms={minDorms}
        maxDorms={maxDorms}
        minVagas={minVagas}
        maxVagas={maxVagas}
        setMinPreco={setMinPreco}
        setMaxPreco={setMaxPreco}
        setMinDorms={setMinDorms}
        setMaxDorms={setMaxDorms}
        setMinVagas={setMinVagas}
        setMaxVagas={setMaxVagas}
        resetFilters={resetFilters}
      />

      <section>
        <h2 className="text-3xl font-extrabold uppercase mb-4 mbl:text-2xl">
          Imóveis disponíveis
        </h2>
        <section className="flex space-x-4 mb-4 mbl:flex-col mbl:items-center mbl:justify-center mbl:space-x-0">
          <input
            type="text"
            placeholder="Pesquisar imóveis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-md px-4 py-2 w-96 focus:border focus:border-blue-500 focus:outline-none mbl:w-full"
          />
          <div className="flex space-x-4 mbl:grid mbl:grid-cols-1 mbl:items-center mbl:justify-center mbl:gap-3 mbl:mt-3 mbl:space-x-0 mbl:w-full">
            <button
              onClick={() => setSortOrder("asc")}
              className={`flex items-center justify-center gap-2 border rounded-md p-3 text-base font-medium mbl:h-full transition-all hover:opacity-85 ${
                sortOrder === "asc"
                  ? "bg-green-500 text-blue-500 border-green-500"
                  : "bg-white text-blue-500 border border-gray-500"
              }`}
            >
              <img width={24} src={filterAscendingIcon} alt="" />
              Preço Crescente
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`flex items-center justify-center gap-2 border rounded-md p-3 text-base font-medium mbl:h-full transition-all hover:opacity-85 ${
                sortOrder === "desc"
                  ? "bg-green-500 text-blue-500 border-green-500"
                  : "bg-white text-blue-500 border-gray-500"
              }`}
            >
              <img width={24} src={filterDescendingIcon} alt="" />
              Preço Decrescente
            </button>
            <button
              onClick={() => setModalIsOpen(true)}
              className="flex items-center justify-center gap-3 p-3 font-medium text-base bg-white text-blue-500 border border-gray-500 rounded-md mbl:w-full transition-all hover:opacity-85"
            >
              <img width={18} src={configIcon} alt="" />
              Filtrar Imóveis
            </button>
          </div>
        </section>
        <section className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 mbl:grid-cols-1">
          {currentImoveis.map((imovel, index) => (
            <div
              key={`${imovel.cep}-${index}`}
              className="border border-gray-100/40 rounded-lg shadow-md"
            >
              <img
                src={imovel.fachada}
                alt={imovel.nome}
                className="w-full h-80 object-cover rounded-t"
              />
              <div className="p-5 pb-10">
                <div className="flex mt-1 mb-4 gap-5 mbl:mb-8 mbl:items-center mbl:justify-between">
                  <div className="flex flex-row items-center justify-center gap-2 bg-white text-blue-500 font-medium rounded mbl:flex-col mbl:items-center mbl:justify-center mbl:text-center">
                    <img width={26} src={bedroomIcon} alt="" />
                    Dorms: {imovel.planta.dorms ?? "0"}
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2 bg-white text-blue-500 font-medium rounded mbl:flex-col mbl:items-center mbl:justify-center mbl:text-center">
                    <img width={26} src={carIcon} alt="" />
                    Vagas: {imovel.planta.vagas ?? "0"}
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2 bg-white text-blue-500 font-medium rounded mbl:flex-col mbl:items-center mbl:justify-center mbl:text-center">
                    <img width={23} src={measureIcon} alt="" />
                    {imovel.planta.metragem ?? "0"}m²
                  </div>
                </div>
                <h2 className="font-medium text-xl my-2 text-blue-500">
                  {imovel.nome}
                </h2>
                <div className="my-2 font-bold text-2xl">
                  R$ {imovel.planta.preco?.toLocaleString()}{" "}
                  <span className="font-light text-base">total</span>
                </div>
                <p>
                  {imovel.rua}, {imovel.num} - {imovel.bairro}, {imovel.cidade},
                  <br />
                  {imovel.cep}
                </p>
              </div>
            </div>
          ))}
        </section>
        {/* Paginação */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`border rounded px-4 py-2 mx-1 transition-all hover:opacity-85 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-8 mt-24">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-500 uppercase mb-7">
              Explore o Nosso Mapa Interativo de Empreendimentos Imobiliários
            </h2>
            <p className="text-base mb-8">
              Navegue pelo mapa para descobrir as localizações dos nossos
              empreendimentos imobiliários em desenvolvimento. Veja as áreas em
              crescimento, oportunidades de investimento, e encontre o imóvel
              dos seus sonhos na localização perfeita.
            </p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  title={faq.title}
                  content={faq.content}
                />
              ))}
            </div>
          </div>

          <div className="rounded overflow-hidden">
            {/* Coloque o componente de mapa aqui */}
            <MapComponent imoveis={filteredAndSortedImoveis} />
          </div>
        </div>
      </section>
    </main>
  );
}
