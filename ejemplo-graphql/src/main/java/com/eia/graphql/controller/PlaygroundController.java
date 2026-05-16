package com.eia.graphql.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controlador que sirve una pagina GraphiQL personalizada.
 *
 * La pagina GraphiQL por defecto de Spring Boot carga scripts
 * desde un CDN externo (unpkg.com), lo cual puede fallar si
 * la red es lenta o el navegador bloquea recursos externos.
 *
 * Este controlador sirve un GraphiQL embebido que funciona
 * como alternativa accesible en /playground.
 */
@Controller
public class PlaygroundController {

    /**
     * Sirve una interfaz GraphQL Playground en /playground.
     * Usa CDN de Apollo Sandbox como alternativa rapida.
     */
    @GetMapping(value = "/playground", produces = "text/html")
    @ResponseBody
    public String playground() {
        return """
            <!DOCTYPE html>
            <html lang="es">
            <head>
              <meta charset="UTF-8">
              <title>GraphQL Playground - EIA</title>
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: -apple-system, sans-serif; background: #0f172a; color: #e2e8f0; }
                .header { background: #1a56db; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; }
                .header h1 { font-size: 14px; font-weight: 600; color: white; }
                .header span { font-size: 12px; opacity: 0.7; color: white; }
                .container { display: grid; grid-template-columns: 1fr 1fr; height: calc(100vh - 44px); }
                .panel { padding: 16px; display: flex; flex-direction: column; }
                .panel-left { border-right: 1px solid #1e293b; }
                label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
                textarea { flex: 1; background: #1e293b; color: #e2e8f0; border: 1px solid #334155; border-radius: 8px; padding: 14px; font-family: 'JetBrains Mono', monospace; font-size: 13px; resize: none; outline: none; line-height: 1.6; }
                textarea:focus { border-color: #3b82f6; }
                .btn { background: #1a56db; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; margin: 10px 0; transition: background 0.2s; }
                .btn:hover { background: #3b82f6; }
                .btn:disabled { opacity: 0.5; cursor: wait; }
                pre { flex: 1; background: #1e293b; color: #e2e8f0; border: 1px solid #334155; border-radius: 8px; padding: 14px; font-family: 'JetBrains Mono', monospace; font-size: 13px; overflow: auto; line-height: 1.6; white-space: pre-wrap; }
                .examples { padding: 8px 16px; background: #1e293b; border-top: 1px solid #334155; display: flex; gap: 8px; flex-wrap: wrap; }
                .ex-btn { background: #334155; color: #94a3b8; border: none; padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer; }
                .ex-btn:hover { background: #475569; color: white; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>GraphQL Playground - Universidad EIA</h1>
                <span>POST /graphql</span>
              </div>
              <div class="examples">
                <span style="font-size:11px;color:#64748b;line-height:24px">Ejemplos:</span>
                <button class="ex-btn" onclick="loadExample('all')">Todos</button>
                <button class="ex-btn" onclick="loadExample('create')">Crear</button>
                <button class="ex-btn" onclick="loadExample('category')">Por Categoria</button>
                <button class="ex-btn" onclick="loadExample('price')">Por Precio</button>
                <button class="ex-btn" onclick="loadExample('update')">Actualizar</button>
                <button class="ex-btn" onclick="loadExample('delete')">Eliminar</button>
              </div>
              <div class="container">
                <div class="panel panel-left">
                  <label>Query / Mutation</label>
                  <textarea id="query">query {
              productos {
                id
                nombre
                descripcion
                precio
                stock
                categoria
              }
            }</textarea>
                  <button class="btn" id="runBtn" onclick="runQuery()">Ejecutar</button>
                </div>
                <div class="panel">
                  <label>Resultado</label>
                  <pre id="result">// Haz clic en "Ejecutar" para ver el resultado</pre>
                </div>
              </div>
              <script>
                const examples = {
                  all: `query {\\n  productos {\\n    id\\n    nombre\\n    descripcion\\n    precio\\n    stock\\n    categoria\\n  }\\n}`,
                  create: `mutation {\\n  crearProducto(\\n    nombre: "Laptop HP Pavilion"\\n    descripcion: "16GB RAM, 512GB SSD"\\n    precio: 3500000\\n    stock: 15\\n    categoria: "Electronica"\\n  ) {\\n    id\\n    nombre\\n    precio\\n  }\\n}`,
                  category: `query {\\n  productosPorCategoria(categoria: "Electronica") {\\n    id\\n    nombre\\n    precio\\n    stock\\n  }\\n}`,
                  price: `query {\\n  productosPorPrecio(min: 10000, max: 5000000) {\\n    nombre\\n    precio\\n    categoria\\n  }\\n}`,
                  update: `mutation {\\n  actualizarProducto(\\n    id: "PEGAR_ID_AQUI"\\n    precio: 2999000\\n    stock: 8\\n  ) {\\n    id\\n    nombre\\n    precio\\n    stock\\n  }\\n}`,
                  delete: `mutation {\\n  eliminarProducto(id: "PEGAR_ID_AQUI")\\n}`
                };
                function loadExample(name) { document.getElementById('query').value = examples[name]; }
                async function runQuery() {
                  const btn = document.getElementById('runBtn');
                  const result = document.getElementById('result');
                  btn.disabled = true; btn.textContent = 'Ejecutando...';
                  result.textContent = '// Cargando...';
                  try {
                    const res = await fetch('/graphql', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ query: document.getElementById('query').value })
                    });
                    const data = await res.json();
                    result.textContent = JSON.stringify(data, null, 2);
                  } catch (err) {
                    result.textContent = 'Error: ' + err.message;
                  }
                  btn.disabled = false; btn.textContent = 'Ejecutar';
                }
                document.getElementById('query').addEventListener('keydown', function(e) {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runQuery(); }
                });
              </script>
            </body>
            </html>
            """;
    }
}
