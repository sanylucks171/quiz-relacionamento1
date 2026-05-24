/* ═══════════════════════════════════════════════════
   funil-copy.js — Motor de copy da tela de vendas
   Lógica: Âncora (micro-fato) + Ponto Ciego (apego oculto)
   Nenhum diagnóstico é entregue antes da compra.
═══════════════════════════════════════════════════ */

// ── 1. Mapper de micro-fatos (verbos no presente, conectores gramaticais) ──
function getMicroFatos(respostas) {
  var fatoGatilhoMap = {
    0: "de su repentino cambio de actitud",
    1: "de esa última discusión entre ustedes",
    2: "de ese momento de desconfianza",
    3: "de la rutina que se instaló"
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
      f1: nombreUsuario + ', sé que desde ' + mf.tempo_afastado + ' vienes dando espacio. No escribes, no persigues, e intentas mantener la dignidad tras ' + mf.fato_gatilho + '.'
        + sp + 'El peligro real es que, en la mente de ' + nombrePareja + ', esa distancia tuya no se está leyendo como orgullo. Se está leyendo como indiferencia.'
        + sp + 'Tu silencio no está generando el efecto emocional que crees. Y ahí está el punto crítico.',
      f2: '¿Por qué ' + nombrePareja + ' se mantiene frío justo ahora?'
        + sp + 'El análisis completo decodifica el perfil de apego que domina a ' + nombrePareja + ' durante su retiro e identifica el punto ciego que está dictando la distancia entre ustedes, antes de que este silencio se vuelva definitivo.'
    },

    slot_2: {
      f1: nombreUsuario + ', escribiste el mensaje. Lo leíste dos veces. Lo borraste.'
        + sp + 'No porque falten ganas, sino porque desde ' + mf.tempo_afastado + ' sientes que él ' + mf.comportamento_recente + ' y no sabes cómo va a aterrizar en su mente. Temes que parezca demasiado. Que confirme lo que él ya sospecha.'
        + sp + 'Esa duda —la de no saber cómo te lee él realmente— es el centro de todo.',
      f2: 'Cada vez que callas por miedo, él llena el vacío con sus propias inseguridades.'
        + sp + 'El análisis completo decodifica la psicología de apego detrás de su retiro actual, revelando el perfil emocional de ' + nombrePareja + ' y dándote la claridad que necesitas para entender lo que él oculta tras su distancia.'
    },

    slot_3: {
      f1: nombreUsuario + ', abres el chat. Ves "en línea". Esperas. Se desconecta y notas que él ' + mf.comportamento_recente + '.'
        + sp + 'Vuelves a entrar en diez minutos solo para ver si algo cambió tras ' + mf.fato_gatilho + '.'
        + sp + 'Sabes que mirar esa pantalla no es un hábito tonto. Es la necesidad urgente de entender por qué alguien que estaba tan cerca ahora se siente tan lejos.',
      f2: 'Quedarte mirando la pantalla no va a resolver la distancia.'
        + sp + 'El análisis completo expone la dinámica oculta de perfiles de apego entre ' + nombrePareja + ' y tú, revelando el malentendido silencioso que congeló la conversación e identificando cómo actuar hoy con madurez psicológica.'
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
