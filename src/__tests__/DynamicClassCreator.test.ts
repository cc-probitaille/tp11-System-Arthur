import DynamicClassLoader from "../DynamicClassCreator";

class TestClass {
  constructor() {
    console.log("Classe TestClass instanciée");
  }
}
(global as any).TestClass = TestClass;

describe("DynamicClassLoader", () => {
  test("charge et instancie une classe valide", () => {
    // Définir la variable d'environnement
    process.env.CLASS_TO_CREATE = "TestClass";
    const instance = DynamicClassLoader.loadAndInstantiateClass();
    expect(instance.constructor.name).toBe("TestClass");
  });

  test("lève une erreur si CLASS_TO_CREATE n'est pas défini", () => {
    // Effacer la variable d'environnement
    process.env.CLASS_TO_CREATE = "";
    expect(() => DynamicClassLoader.loadAndInstantiateClass()).toThrow(
      "La variable d'environnement 'CLASS_TO_CREATE' n'est pas définie."
    );
  });

  test("lève une erreur si la classe n'existe pas", () => {
    // Définir une classe inexistante dans l'environnement
    process.env.CLASS_TO_CREATE = "NonExistentClass";
    expect(() => DynamicClassLoader.loadAndInstantiateClass()).toThrow(
      "La classe 'NonExistentClass' n'existe pas dans l'environnement global."
    );
  });
});
