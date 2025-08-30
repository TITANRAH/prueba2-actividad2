Feature: Login de usuario

  Background:
    Given estoy en la página de "login"

  Scenario: Login exitoso con credenciales válidas
    When ingreso el email "admin@admin.com"
    And ingreso la contraseña "admin"
    And presiono el botón "Ingresar"
    Then soy redirigido a "/dashboard"
    And veo el texto "¡Bienvenido!"

  Scenario Outline: Login inválido
    When ingreso el email "<email>"
    And ingreso la contraseña "<password>"
    And presiono el botón "Ingresar"
    Then permanezco en "/login"
    And veo el texto "Credenciales inválidas"

    Examples:
      | email              | password    |
      | test@test.com      | wrongpass   |
      | admin@admin.com    | wrongpass   |
      | invalid@email      | admin       |
