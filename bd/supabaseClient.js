// ============ SUPABASE CLIENT ============
// Reemplaza estos valores con tus credenciales de Supabase
const SUPABASE_URL = 'https://vmxihpwdshivpigyvbvi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_KVPvgamY88UyQGaLi0R-Qw_AZ5Ht8XS';

// Crear cliente Supabase de forma lazy (usamos nombre interno para evitar colisiones globales)
let _supabaseClient = null;

function getSupabaseClient() {
    if (!_supabaseClient) {
        if (!window.supabase) {
            console.error('Supabase library not loaded');
            return null;
        }
        _supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return _supabaseClient;
}

// ============ FUNCIONES DE AUTENTICACIÓN ============

async function loginUser(email, password) {
    try {
        // Asegurar que el cliente esté disponible (p. ej. bloqueo de tracking puede impedir el CDN)
        const client = getSupabaseClient();
        if (!client) {
            return { success: false, error: 'Supabase no disponible (bloqueo de tracking?).' };
        }

        // Obtener usuario de tabla usuarios por email
        const { data: usuarios, error: userError } = await client
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .single();

        if (userError || !usuarios) {
            return { success: false, error: 'Usuario no encontrado' };
        }

        // Validar contraseña (en producción usar hash)
        if (usuarios.contrasena !== password) {
            return { success: false, error: 'Contraseña incorrecta' };
        }

        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(usuarios));
        return { success: true, user: usuarios };
    } catch (error) {
        console.error('Error en login:', error);
        return { success: false, error: error.message };
    }
}

function logoutUser() {
    localStorage.removeItem('user');
    return { success: true };
}

function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// ============ FUNCIONES PACIENTES ============

async function createPatient(pacientData) {
    try {
        // Calcular edad desde fecha_nacimiento
        const hoy = new Date();
        const cumpleaños = new Date(pacientData.fecha_nacimiento);
        let edad = hoy.getFullYear() - cumpleaños.getFullYear();
        const mes = hoy.getMonth() - cumpleaños.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleaños.getDate())) {
            edad--;
        }

        const { data, error } = await getSupabaseClient()
            .from('pacientes')
            .insert([
                {
                    cedula: pacientData.cedula,
                    nombres: pacientData.nombres,
                    apellidos: pacientData.apellidos,
                    fecha_nacimiento: pacientData.fecha_nacimiento,
                    sexo: pacientData.sexo,
                    email: pacientData.email,
                    telefono: pacientData.telefono,
                    direccion_residencia: pacientData.direccion_residencia,
                    sector: pacientData.sector,
                    municipio: pacientData.municipio,
                    estado_civil: pacientData.estado_civil,
                    ocupacion: pacientData.ocupacion,
                    contacto_emergencia_nombre_completo: pacientData.contacto_emergencia_nombre_completo,
                    contacto_emergencia_telefono: pacientData.contacto_emergencia_telefono,
                    alergias: pacientData.alergias,
                    tipo_sangre: pacientData.tipo_sangre,
                    medicamentos_actuales: pacientData.medicamentos_actuales,
                    estado: true
                }
            ])
            .select();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al crear paciente:', error);
        return { success: false, error: error.message };
    }
}

async function getPatients() {
    try {
        const { data, error } = await getSupabaseClient()
            .from('pacientes')
            .select('*')
            .eq('estado', true)
            .order('nombres', { ascending: true });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener pacientes:', error);
        return { success: false, error: error.message };
    }
}

async function getPatientById(id) {
    try {
        const { data, error } = await getSupabaseClient()
            .from('pacientes')
            .select('*')
            .eq('id_Paciente', id)
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener paciente:', error);
        return { success: false, error: error.message };
    }
}

// ============ FUNCIONES CITAS ============

async function createAppointment(appointmentData) {
    try {
        const { data, error } = await getSupabaseClient()
            .from('citas')
            .insert([
                {
                    id_pacientes_fk: appointmentData.id_pacientes_fk,
                    id_medico_fk: appointmentData.id_medico_fk,
                    fecha_cita: appointmentData.fecha_cita,
                    hora_cita: appointmentData.hora_cita,
                    duracion_estimada: appointmentData.duracion_estimada,
                    motivo: appointmentData.motivo,
                    tipo_consulta: appointmentData.tipo_consulta,
                    estado: 'Programada',
                    notas_adicionales: appointmentData.notas_adicionales || '',
                    recordatorio_enviado: false
                }
            ])
            .select();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al crear cita:', error);
        return { success: false, error: error.message };
    }
}

async function getAppointments(date = null) {
    try {
        let query = getSupabaseClient().from('citas').select('*, pacientes(nombres, apellidos), usuarios(nombres, apellidos, especialidad)');

        if (date) {
            query = query.eq('fecha_cita', date);
        }

        const { data, error } = await query.order('fecha_cita', { ascending: false });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener citas:', error);
        return { success: false, error: error.message };
    }
}

async function updateAppointmentStatus(id, status) {
    try {
        const { data, error } = await getSupabaseClient()
            .from('citas')
            .update({ estado: status })
            .eq('id_citas', id)
            .select();

        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al actualizar cita:', error);
        return { success: false, error: error.message };
    }
}

// ============ FUNCIONES SERVICIOS ============

async function getServices() {
    try {
        const { data, error } = await getSupabaseClient()
            .from('servicios')
            .select('*')
            .eq('activo', true);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        return { success: false, error: error.message };
    }
}

// ============ FUNCIONES FACTURAS ============

async function createInvoice(invoiceData) {
    try {
        const user = getCurrentUser();
        if (!user) {
            return { success: false, error: 'No hay usuario autenticado' };
        }

        // Generar número de factura
        const numeroFactura = `FAC-${Date.now()}`;

        const { data, error } = await getSupabaseClient()
            .from('facturas')
            .insert([
                {
                    id_paciente_fk: invoiceData.id_paciente_fk,
                    id_medico_fk: user.id_usuario,
                    numero_factura: numeroFactura,
                    monto_total: invoiceData.monto_total,
                    estado: 'pendiente',
                    metodo_pago: invoiceData.metodo_pago || null
                }
            ])
            .select();

        if (error) {
            return { success: false, error: error.message };
        }

        // Crear detalles de la factura
        const invoiceId = data[0].id_factura;
        const details = invoiceData.items.map(item => ({
            id_cita_fk: invoiceData.id_cita_fk || null,
            id_servicio_fk: item.id_servicio_fk,
            precio_aplicado: item.precio_aplicado,
            cantidad: item.cantidad || 1
        }));

        const { error: detailError } = await getSupabaseClient()
            .from('detalle_cita')
            .insert(details);

        if (detailError) {
            return { success: false, error: detailError.message };
        }

        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al crear factura:', error);
        return { success: false, error: error.message };
    }
}

async function getInvoices() {
    try {
        const { data, error } = await getSupabaseClient()
            .from('facturas')
            .select('*, pacientes(nombres, apellidos), usuarios(nombres, apellidos)')
            .order('fecha_emision', { ascending: false });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener facturas:', error);
        return { success: false, error: error.message };
    }
}

async function updateInvoiceStatus(id, status) {
    try {
        const { data, error } = await getSupabaseClient()
            .from('facturas')
            .update({ estado: status })
            .eq('id_factura', id)
            .select();

        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al actualizar factura:', error);
        return { success: false, error: error.message };
    }
}

// ============ FUNCIONES USUARIOS ============

async function getDoctors() {
    try {
        const { data, error } = await getSupabaseClient()
            .from('usuarios')
            .select('*')
            .eq('rol', 'Medico')
            .eq('activo', true);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error al obtener médicos:', error);
        return { success: false, error: error.message };
    }
}
