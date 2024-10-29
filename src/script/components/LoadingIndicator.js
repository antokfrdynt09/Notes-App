class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .loading-container {
          position: fixed; /* Memastikan loading screen tetap diatas */
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999; /* Pastikan di atas elemen lain */
          overflow: hidden;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 8px solid #4793AF; /* Warna indikator */
          border-top-color: transparent; /* Warna bagian yang berputar */
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="loading-container">
        <div class="spinner"></div>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
export default LoadingIndicator;
