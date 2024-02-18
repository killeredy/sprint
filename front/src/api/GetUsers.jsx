import { useEffect, useState } from "react";

export function GetUsers() {
  const [usuarios, setUsuarios] = useState();

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

  return usuarios;
}
