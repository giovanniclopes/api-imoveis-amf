import Modal from "react-modal";

interface FilterModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  minPreco: number;
  maxPreco: number;
  minDorms: number;
  maxDorms: number;
  minVagas: number;
  maxVagas: number;
  setMinPreco: (value: number) => void;
  setMaxPreco: (value: number) => void;
  setMinDorms: (value: number) => void;
  setMaxDorms: (value: number) => void;
  setMinVagas: (value: number) => void;
  setMaxVagas: (value: number) => void;
  resetFilters: () => void;
}

export function FilterModal({
  isOpen,
  onRequestClose,
  minPreco,
  maxPreco,
  minDorms,
  maxDorms,
  minVagas,
  maxVagas,
  setMinPreco,
  setMaxPreco,
  setMinDorms,
  setMaxDorms,
  setMinVagas,
  setMaxVagas,
  resetFilters,
}: FilterModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Filtros"
      className="bg-white max-w-[500px] w-full relative z-[1000] m-auto p-5 rounded-lg mbl:m-6"
      overlayClassName="overlay"
    >
      <div className="mb-4">
        <label className="block mb-1">Preço Mínimo</label>
        <input
          type="number"
          value={minPreco}
          onChange={(e) => setMinPreco(Number(e.target.value))}
          className="border focus:border focus:border-blue-500 focus:outline-none rounded px-2 py-1 w-full"
          placeholder="Preço Mínimo"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Preço Máximo</label>
        <input
          type="number"
          value={maxPreco}
          onChange={(e) => setMaxPreco(Number(e.target.value))}
          className="border focus:border focus:border-blue-500 focus:outline-none rounded px-2 py-1 w-full"
          placeholder="Preço Máximo"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Dormitórios Mínimos</label>
        <input
          type="number"
          value={minDorms}
          onChange={(e) => setMinDorms(Number(e.target.value))}
          className="border focus:border focus:border-blue-500 focus:outline-none rounded px-2 py-1 w-full"
          placeholder="Dormitórios Mínimos"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Dormitórios Máximos</label>
        <input
          type="number"
          value={maxDorms}
          onChange={(e) => setMaxDorms(Number(e.target.value))}
          className="border focus:border focus:border-blue-500 focus:outline-none rounded px-2 py-1 w-full"
          placeholder="Dormitórios Máximos"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Vagas Mínimas</label>
        <input
          type="number"
          value={minVagas}
          onChange={(e) => setMinVagas(Number(e.target.value))}
          className="border focus:border focus:border-blue-500 focus:outline-none rounded px-2 py-1 w-full"
          placeholder="Vagas Mínimas"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Vagas Máximas</label>
        <input
          type="number"
          value={maxVagas}
          onChange={(e) => setMaxVagas(Number(e.target.value))}
          className="border focus:border focus:border-blue-500 focus:outline-none rounded px-2 py-1 w-full"
          placeholder="Vagas Máximas"
        />
      </div>
      <div className="flex justify-between">
        <button
          aria-label="Reiniciar filtros de busca"
          onClick={resetFilters}
          className="border border-blue-500 rounded px-4 py-2 bg-white text-blue-500 transition-all hover:bg-green-500 hover:border-green-500"
        >
          Limpar Filtros
        </button>
        <button
          aria-label="Fechar caixa de filtros"
          onClick={onRequestClose}
          className="border border-blue-500 rounded px-4 py-2 bg-blue-500 text-white transition-all hover:opacity-85"
        >
          Fechar
        </button>
      </div>
    </Modal>
  );
}
