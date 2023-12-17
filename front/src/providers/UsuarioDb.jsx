import React, { useState, useEffect } from "react";
export const UsuarioContext = React.createContext({});

export const UsuarioProvider = (prop) => {
  const [usuarios, setUsuarios] = useState([
    {
      id: "",
      nome: "",
      matricula: "",
      btn: "Salvar",
      edit: true,
    },
  ]);

  const url = import.meta.env.VITE_URL_API + "user";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status == "error") {
            let list = [
              {
                edit: true,
                btn: "Salve",
                nome: "",
                matricula: "",
                id: 0,
              },
            ];

            setUsuarios(list);
            return;
          }

          let list = result.data.map((elem) => {
            return {
              edit: false,
              btn: "Editar",
              nome: elem.nome,
              matricula: elem.matricula,
              id: elem.id,
            };
          });

          setUsuarios(list);
        },
        (error) => {
          console.error(error);
        }
      );
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuarios, setUsuarios }}>
      <>{prop.children}</>
    </UsuarioContext.Provider>
  );
};

export const useUsuarios = () => React.useContext(UsuarioContext);
