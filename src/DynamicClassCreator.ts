class DynamicClassCreator {
    static loadAndInstantiateClass(): object {
      const className = process.env.CLASS_TO_CREATE;
  
      if (!className) {
        throw new Error("La variable d'environnement 'CLASS_TO_CREATE' n'est pas définie.");
      }
  
      const dynamicClass = global[className as keyof typeof global];
      if (typeof dynamicClass !== "function") {
        throw new Error(`La classe '${className}' n'existe pas dans l'environnement global.`);
      }
  
      return new dynamicClass();
    }
  }
  
  export default DynamicClassCreator;
  