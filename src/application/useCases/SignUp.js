class SignUp {
  /**
   * @param {import('../../infraestructure/repositories/MongoUserRepository')} userRepository
   * @param {import('../../infraestructure/services/PasswordHasher')} passwordHasher
   */
  constructor(userRepository, passwordHasher) {
    this.userRepository  = userRepository;
    this.passwordHasher  = passwordHasher;
  }
 
  /**
   * @param {{ username: string, password: string }} input
   * @returns {Promise<{ id: string, username: string, roles: string[] }>}
   */
  async execute({ username, password, roles = ['user'] }) {
    // 1. Verificar unicidad
    const existing = await this.userRepository.findByUsername(username);
    if (existing) {
      throw new Error('Username already taken');
    }
    // 2. Hashear contraseña
    const hashed = await this.passwordHasher.hash(password);
    // 3. Crear en repositorio
    const created = await this.userRepository.create({
      username,
      password: hashed,
      roles
    });
    // 4. Devolver DTO
    return { id: created._id.toString(), username: created.username, roles: created.roles };
  }
}
 
module.exports = SignUp;