/* ═══════════════════════════════════════════════════
   funil-copy.js — Motor de copy da tela de vendas
   Lógica: Âncora (micro-fato) + Ponto Ciego (apego oculto)
   Nenhum diagnóstico é entregue antes da compra.
═══════════════════════════════════════════════════ */

// ── 1. Mapper de micro-fatos (verbos no presente, conectores gramaticais) ──
function getMicroFatos(respostas) {
  var fatoGatilhoMap = {
    0: "su repentino cambio de actitud",
    1: "esa última discusión entre ustedes",
    2: "ese momento de desconfianza",
    3: "la rutina que se instaló"
  };

  var tempoAfastadoMap = {
    0: "hace días",
    1: "las últimas semanas",
    2: "meses",
    3: "esa última noche"
  };

  var comportamentoRecenteMap = {
    0: "te deja en visto",
    1: "responde frío y cortante",
    2: "desaparece sin avisar",
    3: "evita hablar de lo que siente"
  };

  return {
    fato_gatilho:          fatoGatilhoMap[respostas[3]]  || "su distanciamiento",
    tempo_afastado:        tempoAfastadoMap[respostas[4]] || "un tiempo",
    comportamento_recente: comportamentoRecenteMap[respostas[5]] || "se aleja"
  };
}

// ── 2. Gerador de textos da tela de vendas ──
function obterTextosVendas(nombreUsuario, nombrePareja, respostas) {
  var mf = getMicroFatos(respostas);
  var sp = '<span style="display:block;margin-top:.75rem"></span>';

  var slots = {

    slot_0: {
      f1: nombreUsuario + ', llevas ' + mf.tempo_afastado + ' manteniendo la distancia. No escribes primero, no insistes, intentas preservar algo de dignidad después de ' + mf.fato_gatilho + '.'
        + sp + 'Lo que no sabes es que ese silencio tuyo está activando algo muy específico en la mente de ' + nombrePareja + ' — algo que él no te diría aunque se lo preguntaras directamente.'
        + sp + 'Esa interpretación está tomando una dirección que tú no puedes ver desde donde estás. Hay un momento preciso en que el silencio deja de ser una ventaja y se convierte en un riesgo irreversible. Tu análisis completo revela cuál es ese límite antes de que sea tarde.',
      f2: 'Lo que está pasando en la mente de ' + nombrePareja + ' ahora mismo tiene una lógica que tú no puedes ver desde afuera. El análisis completo la expone — y con ella, el único paso que puede cambiar la dirección de esto antes de que sea demasiado tarde.'
    },

    slot_2: {
      f1: nombreUsuario + ', escribiste el mensaje. Lo leíste dos veces. Lo borraste.'
        + sp + 'Ese momento —ese segundo de duda— dice más sobre tu situación con ' + nombrePareja + ' que cualquier conversación que hayan tenido.'
        + sp + 'Porque la duda no viene de no saber qué sentir. Viene de no saber cómo él está leyendo cada movimiento tuyo en este momento. Y esa incertidumbre tiene una razón muy precisa que tu análisis identifica.',
      f2: 'Lo que está pasando en la mente de ' + nombrePareja + ' ahora mismo tiene una lógica que tú no puedes ver desde afuera. El análisis completo la expone — y con ella, el único paso que puede cambiar la dirección de esto antes de que sea demasiado tarde.'
    },

    slot_3: {
      f1: nombreUsuario + ', abres el chat. Ves "en línea". Esperas. Se desconecta y notas que él ' + mf.comportamento_recente + '.'
        + sp + 'No es un hábito tonto — es tu intuición diciéndote que hay algo que todavía no entiendes de lo que está pasando en la mente de ' + nombrePareja + ' después de ' + mf.fato_gatilho + '.'
        + sp + 'Lo que haces — o dejas de hacer — en las próximas horas importa más de lo que parece. Tu análisis completo revela la radiografía exacta de su mente en este momento y el único movimiento capaz de romper su frialdad.',
      f2: 'Lo que está pasando en la mente de ' + nombrePareja + ' ahora mismo tiene una lógica que tú no puedes ver desde afuera. El análisis completo la expone — y con ella, el único paso que puede cambiar la dirección de esto antes de que sea demasiado tarde.'
    }

  };

  // Seleção de slot por resposta r0 (Q1[0] — reação ao silêncio dele)
  // r0=0 (revisa celular)    → slot_3 El Hábito Invisible
  // r0=1 (espera)            → slot_0 Incomprensión Mutua
  // r0=2 (qué hice mal)      → slot_2 El Mensaje Borrado
  // r0=3 (actúa fría)        → slot_0 Incomprensión Mutua
  var slotMap = { 0: 'slot_3', 1: 'slot_0', 2: 'slot_2', 3: 'slot_0' };
  var slotKey = slotMap[respostas[0]] || 'slot_0';

  return slots[slotKey];
}
