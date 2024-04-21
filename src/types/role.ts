export enum Role {
  SUPER_ADMINISTRATOR = 'SUPER_ADMINISTRATOR',
  ADMINISTRATOR = 'ADMINISTRATOR',
  ONCOLOGIST = 'ONCOLOGIST',
  RADIONCOLOGIST = 'RADIONCOLOGIST',
  NURSE = 'NURSE',
  RADIOTHERAPIST = 'RADIOTHERAPIST',
}

export const RoleInSpanish: { [key in Role]: string } = {
  SUPER_ADMINISTRATOR: 'Súper Administrador',
  ADMINISTRATOR: 'Administrador',
  ONCOLOGIST: 'Oncólogo',
  RADIONCOLOGIST: 'Radioncólogo',
  NURSE: 'Enfermero',
  RADIOTHERAPIST: 'Radioterapeuta',
};
