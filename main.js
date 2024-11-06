function getProjects() {
    const urlGitHub = "https://api.github.com/users/pinguim2214/repos"; // Inserir o nome de usuário do seu github
    const loadingElement = document.getElementById("loading");
    const listElement = document.getElementById("my-projects-list");
  
    fetch(urlGitHub, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Erro ao buscar os repositórios. Verifique o nome do usuário ou a conexão."
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          listElement.innerHTML = "<p>Nenhum projeto encontrado.</p>";
        } else {
          showProjects(data);
        }
        loadingElement.style.display = "none"; // Esconde o loading apenas após o processamento
      })
      .catch((error) => {
        console.error(`Erro -> ${error}`);
        loadingElement.innerHTML =
          "<p>Erro ao carregar projetos. Tente novamente mais tarde.</p>";
      });
  }
  
  function showProjects(data) {
    const listElement = document.getElementById("my-projects-list");
    data.forEach((repo) => {
      const div = document.createElement("div");
      div.classList.add("project-item"); // Classe para estilização
  
      const a = document.createElement("a");
      a.href = repo["https://github.com/pinguim2214?tab=repositories"]; // Link para o repositório no GitHub
      a.target = "_blank";
      a.title = repo["description"] || "Repositório no GitHub";
      a.textContent = repo["name"];
  
      div.appendChild(a);
      listElement.appendChild(div);
    });
  }
  
  // Chamada da função ao carregar o script
  getProjects();